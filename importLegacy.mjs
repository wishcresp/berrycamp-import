/**
 * Import modded maps into Berry Camp with a manual config. For vanilla and compatability.
 * 
 * Usage:
 * Add a config with the required format in ./config/
 * 
 * $ node importLegacy.mjs celeste
 * 
 */

import {exec as asyncExec} from "child_process";
import fs from "fs";
import util from "util";
const exec = util.promisify(asyncExec);

const CONFIG_DIR = "config";
const OUTPUT_DIR = "output";
const validEntities = new Set(["player", "strawberry", "cassette", "blackGem", "summitGem"]);
const entityTypes = new Map([
  ["player", "p"],
  ["strawberry", "s"],
  ["cassette", "c"],
  ["blackGem", "h"],
  ["summitGem", "g"],
]);

const areaArg = process.argv[2];

// Load the import config.
const {id, areaId, name, author, link, chapters} = JSON.parse(fs.readFileSync(`./${CONFIG_DIR}/${areaArg}.json`, "utf-8"));

const area = {
  i: id,
  g: areaId,
  n: name,
  a: author,
  l: link,
  c: [],
};

for (const {id, gameId, name, sides} of chapters) {
  const chapter = {
    i: id,
    g: gameId,
    n: name,
    s: [],
  };

  for (const {file, checkpoints} of sides) {
    console.log(`Processing ${file}`);

    const {stdout} = await exec(`julia loadMap.jl maps/${file}.bin`, {maxBuffer: 64 * 1024 * 1024});
    const {rooms} = JSON.parse(stdout);

    let cpIdx = 0;

    const c = checkpoints.map(({name: n, abv: a}) => ({n, a})).slice(1);
    
    const unorderedRooms = rooms.map(({name, position: [x, y], size: [w, h], entities}) => ({
      i: name.slice(4),
      p: {x, y},
      s: {w, h},
      e: entities === undefined ? [] : entities.filter(entity => {
        if (entity.name === "checkpoint") {
          c[cpIdx] = {i: name.slice(4), ...c[cpIdx]};
          cpIdx++;
        }
        return validEntities.has(entity.name);
      }).map(({id: i, name, data: {x, y, checkpointID: c, order: o}}) => ({t: entityTypes.get(name), i, x, y, c, o})),
    }));

    // Order the rooms.
    const r = [
      ...checkpoints.reduce((acc, {order}) => {
        acc.push(...order)
        return acc;
      }, []).map(id => unorderedRooms.find(r => r.i === id)),
    ];
    
    chapter.s.push({c, r});
  };
  
  area.c.push(chapter);
};

// Write the output.
fs.writeFileSync(`${OUTPUT_DIR}/${areaArg}.json`, JSON.stringify(area));