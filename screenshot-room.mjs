import {exec as asyncExec} from "child_process";
import fs from "fs";
import util from "util";
const exec = util.promisify(asyncExec);

/**
 * Screenshot and stitch all rooms in a level.
 * 
 * Mod id is required. Other arguments are optional.
 * The mod id is the id of the map in berrycamp/the associated ./output/<modId>.json
 * 
 * eg. node screenshot-room.mjs d-sides 1-ForsakenCity a 01
 */
// Berrycamp id: d-sides
const modArg = process.argv[2];
// Chapter game id: 0-Intro
const chapterArg = process.argv[3];
// Side: a, b, c
const sideArg = process.argv[4];
// roomId: s0
const roomArg = process.argv[5];

const {g: areaGameId, c: chapterData} = JSON.parse(fs.readFileSync(`./output/${modArg}/.json`));

const chapters = chapterArg ? [chapterData.find(c => c.g === chapterArg)] : chapterData;
for (const {g: chapterGameId, s: sideData} of chapters) {
  const sides = sideArg ? [sideData[getSideIndex(sideArg)]] : sideData;
  for (const {r: roomData} of sides) {
    const rooms = roomArg ? [roomData.find(r => r.i === roomArg)] : rooms;
    for (const {i: roomId, s: {w, h}} of rooms) {
      await exec(`powershell -ExecutionPolicy Bypass -File .\\screenshot_room.ps1 -area_id ${areaGameId} -map_id ${chapterGameId} -side_id ${sideArg} -debug_id ${roomId} -room_width ${w} -room_height ${h} -bc_area_id ${areaGameId} -bc_map_id ${chapterGameId}`)
    }
  }
}

const getSideIndex = (side) => {
  side = side.toLowerCase();
  switch (side) {
    case "a":
      return 0;
    case "b":
      return 1;
    case "c":
      return 2;
  }
  throw Error("Side invalid");
}
