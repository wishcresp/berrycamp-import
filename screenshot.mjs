import {exec as asyncExec} from "child_process";
import fs from "fs";
import util from "util";
const exec = util.promisify(asyncExec);

/**
 * Screenshot and stitch all rooms in a level.
 * 
 * Requires Julia, Maple, imagemagick and pngquant.
 * 
 * Mod id is required. Other arguments are optional.
 * The mod id is the id of the map in berrycamp/the associated ./output/<modId>.json
 * 
 * eg. node screenshot.mjs room d-sides 1-ForsakenCity a 01
 */

/**
 * mode "room" or "preview"
 * modArg The desired berrycamp mod id
 * chapterArg (Optional) The chapter to screenshot eg. 0-Intro
 * sideArg (Optional) The side to screenshot: "a" or "b" or "c"
 * roomArg (Optional) The room to screenshot eg. d-01
 * continueArg (Optional) "continue" to continue from the specified room.
 */
const [,, mode, modArg, chapterArg, sideArg, roomArg, continueArg] = process.argv;

const getSideIndex = (side) => {
  const code = side.toUpperCase().charCodeAt(0);
  if (code < 65 || code > 67) {
    throw Error("Invalid side");
  }
  return code - 65;
}

const getSide = (sideIndex = 0) => {
  if (sideIndex < 0 || sideIndex > 2) {
    throw Error("Invalid side");
  }
  return String.fromCharCode(sideIndex + 65);
}

const {g: areaGameId, c: chapterData} = JSON.parse(fs.readFileSync(`./output/${modArg}.json`));

const chapters = chapterArg ? [chapterData.find(c => c.g === chapterArg)] : chapterData;
for (const {g: chapterGameId, s: sideData} of chapters) {
  console.log("Chapter: ", chapterGameId)
  const sides = sideArg !== undefined ? [[sideArg, sideData[getSideIndex(sideArg)]]] : sideData.map((d, i) => [getSide(i), d]);
  for (const [sideId, {r: roomData}] of sides) {
    console.log("Side: ", sideId);
    let startIndex = roomData.findIndex(r => r.i === roomArg);
    if (roomArg === undefined && continueArg === undefined) {
      startIndex = 0;
    }
    if (startIndex < 0) {
      throw Error("Could not find room");
    }

    const rooms = roomArg !== undefined ? [roomData[startIndex]] : roomData.slice(startIndex)
    for (const {i: roomId, s: {w, h}, e} of rooms) {
      console.log("Room: ", roomId);
      const powershellArgs = "powershell -ExecutionPolicy Bypass"
      const roomArgs = `-area_id ${areaGameId} -map_id ${chapterGameId} -side_id ${sideId} -debug_id ${roomId} -bc_area_id ${areaGameId} -bc_map_id ${chapterGameId}`;
      if (mode === "preview") {
        const {x, y} = e.find(e => e.t === "p");
        await exec(`${powershellArgs} -File .\\screenshot_preview.ps1 ${roomArgs} -x ${x ?? 0} -y ${y ?? 0}`);
      } else {
        await exec(`${powershellArgs} -File .\\screenshot_room.ps1 ${roomArgs} -room_width ${w} -room_height ${h}`);
      }
    }
  }
}
