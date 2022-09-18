/**
 * Imports a mod zip into Berry Camp.
 * 
 * Required dependencies:
 * - 7zip
 * 
 * usage: 
 * 
 * $ node import.mjs "lunar-ruins" "Lunar_ruins.zip" "Lunar Ruins" "Tomonn" "https://gamebanana.com/mods/150491"
 */

import {exec as asyncExec} from "child_process";
import fs from "fs";
import readline from "readline";
import util from "util";
const exec = util.promisify(asyncExec);

const MAX_MAP_OUTPUT_BYTES = 64 * 1024 * 1024; // 64MB
const TEMP_DIR = ".temp";
const OUTPUT_DIR = "output";
const validEntities = new Set(["player", "strawberry", "cassette", "blackGem", "summitGem"]);
const entityTypes = new Map([
  ["player", "p"],
  ["strawberry", "s"],
  ["cassette", "c"],
  ["blackGem", "h"],
  ["summitGem", "g"],
]);

// Thanks max480.
const MAP_NAME_REGEXP = /^(?:(?<order>\d+)(?<side>[ABCHX]?)\-)?(?<name>.+?)(?:\-(?<sideAlt>[ABCHX]?))?$/;

const [,, areaArg, zipArg, nameArg, authorArg, linkArg] = process.argv;

try {
  // Create the temp dir.
  fs.mkdirSync(TEMP_DIR);
} catch {}

// Extract to the temp dir.
await exec(`7z x ${zipArg} "-o${TEMP_DIR}/${areaArg}"`);

const modDir = `${TEMP_DIR}/${areaArg}`;

// Find the maps and sort them under their parent areas.
const areaEntries = [];
const mapsDir = `${modDir}/Maps`;
const [modId] = fs.readdirSync(mapsDir);
const areaDir = `${mapsDir}/${modId}`;
for (const areaId of fs.readdirSync(areaDir)) {
  areaEntries.push([
    areaId,
    fs.readdirSync(`${areaDir}/${areaId}`).filter(file => file.toLowerCase().endsWith(".bin")).map(file => file.slice(0, file.length - 4))
  ]);
}

// Read the dialog file and save the key-value pairs for later.
const lines = new Map();
const dialogPath = `${TEMP_DIR}/${areaArg}/Dialog/English.txt`;
const input = fs.createReadStream(dialogPath);
for await (const line of readline.createInterface({input, crlfDelay: Infinity})) {
  let [key, value] = line.split("=");
  if (key === undefined || value === undefined) {
    continue;
  }
  lines.set(key.trim(), value.trim());
}

const areas = [];

// Process a config for each area.
for (const [areaId, maps] of areaEntries) {
  const gameId = `${modId}/${areaId}`;

  const area = {
    g: gameId,
    n: nameArg,
    a: authorArg,
    l: linkArg,
    c: [],
  };

  for (const map of maps) {
    const matches = map.match(MAP_NAME_REGEXP);
    if (matches === null) {
      throw Error(`Map name ${map} could not be parsed.`);
    }

    const [, orderMatch, sideMatch, nameMatch, sideAltMatch] = matches;
    let mapName = map;
    let side = "A";
    if (sideMatch) {
      mapName = `${orderMatch ?? ""}${sideMatch}-${nameMatch}`;
      side = sideMatch;
    } else if (sideAltMatch) {
      mapName = `${orderMatch ?? ""}-${nameMatch}-${sideAltMatch}`;
      side = sideAltMatch;
    }

    const mapIdentifier = `${modId}_${areaId}_${mapName.replace(/[/-]/, "_")}`;
    const sideIndex = side === "A" ? 0 : side === "B" ? 1 : 2;

    let chapter = area.c.find(c => c.gameId === mapName);
    if (chapter === undefined) {
      chapter = {
        g: mapName,
        n: lines.get(mapIdentifier),
        s: [],
      }
      area.c.push(chapter);
    }

    // Get the side data.
    const {stdout} = await exec(`julia loadMap.jl maps/${map}.bin`, {maxBuffer: MAX_MAP_OUTPUT_BYTES});
    const {rooms} = JSON.parse(stdout);

    const c = [];
    const r = rooms.map(({name, position: [x, y], size: [w, h], entities}) => {
      const simpleName = name.slice(4);
      return {
        i: simpleName,
        p: {x, y},
        s: {w, h},
        e: entities === undefined ? [] : entities.filter(({name}) => {
          if (name === "checkpoint") {
            c.push({i: simpleName, n: lines.get(`${mapIdentifier}_${simpleName.replace("-", "_")}`)});
          }
          return validEntities.has(name);
        }).map(({id: i, name, data: {x, y, checkpointID: c, order: o}}) => ({t: entityTypes.get(name), i, x, y, c, o})),
      };
    });

    chapter.s[sideIndex] = {c, r};
  }

  // Sort the chapters.
  area.c.sort((a, b) => {
    const [, order1 = 0] = a.g.match(MAP_NAME_REGEXP);
    const [, order2 = 0] = b.g.match(MAP_NAME_REGEXP);
    return order1 - order2;
  });

  areas.push([gameId, JSON.stringify(area)]);
}



if (areas.length === 1) {
  fs.writeFileSync(`${OUTPUT_DIR}/${areaArg}.json`, areas[0][1])
} else {
  areas.forEach(([identifier, area]) => {
    fs.writeFileSync(`${OUTPUT_DIR}/${identifier.replace("/", "_")}.json`, area);
  });
}