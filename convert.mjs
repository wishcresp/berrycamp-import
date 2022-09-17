const fs = require("fs");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

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

const areaArg = process.argv[1];

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
    const {stdout} = await exec(`julia loadMap.jl ${CONFIG_DIR}/${file}.bin`);
    const {rooms} = JSON.parse(stdout);

    const side = {
      c: checkpoints.map(({name: n, abv: a, order: o}) => ({...n && {n}, ...a && {a}, ...o && {o}})),
      r: rooms.map(({name, position: [x, y], size: [w, h], entities}) => ({
        i: name.slice(4),
        p: {x, y},
        s: {w, h},
        e: entities.filter()
      })),
    };

    for (const {name, position: [x, y], size: [w, h], entities} of rooms) {
      const debugId = name.slice(4);
      let cpIdx = 0;
      
      const room = {
        i: debugId,
        p: {x, y},
        s: {w, h},
        e: entities.filter(({name}) => {
          if (name === "checkpoint") {
            side.c[cpIdx] = {i: debugId, ...side.c[cpIdx]};
            cpIdx++;
          }
          return validEntities.has(name);
        }).map(({name, x, y, checkpointID, order}) => ({
          t: entityTypes.get(name),
          x,
          y,
          ...checkpointID && {c: checkpointID},
          ...order && {o: order},
        })),
      };

      side.r.push(room);
    };

    chapter.s.push(side);
  };

  area.c.push(chapter);
};

// Write the output.
fs.writeFileSync(`${OUTPUT_DIR}/${areaKey}.json`, JSON.stringify(area));