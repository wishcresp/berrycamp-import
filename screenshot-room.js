const fs = require("fs");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

const level = process.argv[2];
const side = process.argv[3];
const room = process.argv[4];

const bcAreaId = "celeste";
const areaId = "Celeste";

const {gameId} = JSON.parse(fs.readFileSync(`./output/${level}/chapter.json`, 'utf8'));
const data = JSON.parse(fs.readFileSync(`./output/${level}/${side}.json`, 'utf8'));

const screenshot = async () => {
  const rooms = room ? [[room, data.rooms[room]]] : Object.entries(data.rooms);
  for (const [debugId, {canvas: {size: {width, height}}}] of rooms) {
    await exec(`powershell -ExecutionPolicy Bypass -File .\\screenshot_room.ps1 -area_id ${areaId} -map_id ${gameId} -side_id ${side} -debug_id ${debugId} -room_width ${width} -room_height ${height} -bc_area_id ${bcAreaId} -bc_map_id ${level}`)
  }
}

screenshot();
