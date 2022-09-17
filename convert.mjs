const fs = require("fs");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

/**
 * Manual base area config.
 */
const config = {
  "id": "celeste",
  "areaId": "Celeste",
  "name": "Celeste",
  "author": "EXOK Games",
  "link": "https://store.steampowered.com/app/504230/Celeste/",
  "levels": [
    {
      "id": "prologue",
      "gameId": "0-Intro",
      "name": "Prologue",
      "sides": [
        {
          "file": "0-Intro",
          "checkpoints": [
            {
              "order": [
                "-1",
                "0",
                "0b",
                "1",
                "2",
                "3"
              ]
            },
          ],
        }
      ],
    },
    {
      "id": "city",
      "gameId": "1-ForsakenCity",
      "name": "Forsaken City",
      "sides": [
        {
          "file": "1-ForsakenCity",
          "checkpoints": [
            {
              "order": [
                "1",
                "2",
                "3",
                "4",
                "3b",
                "5",
                "5z",
                "5a"
              ]
            },
            {
              "name": "Crossing",
              "abv": "CR",
              "order": [
                "6",
                "6z",
                "6zb",
                "7zb",
                "6a",
                "6b",
                "s0",
                "s1",
                "6c",
                "7",
                "7z",
                "8z",
                "8zb",
                "8",
                "7a",
                "9z",
                "8b",
                "9"
              ]
            },{
              "name": "Chasm",
              "abv": "CH",
              "order": [
                "9b",
                "9c",
                "10",
                "10z",
                "10zb",
                "11",
                "11z",
                "10a",
                "12",
                "12z",
                "12a",
                "end"
              ]
            }
          ],
        },
        {
          "file": "1H-ForsakenCity",
          "checkpoints": [
            {
              "order": [
                "00",
                "01",
                "02",
                "02b",
                "03"
              ]
            },
            {
              "name": "Contraption",
              "abv": "CT",
              "order": [
                "04",
                "05",
                "05b",
                "06",
                "07"
              ]
            },{
              "name": "Scrap Pit",
              "abv": "SP",
              "order": [
                "08",
                "08b",
                "09",
                "10",
                "11",
                "end"
              ]
            }
          ],
        }
        {
          "file": "1X-ForsakenCity",
          "checkpoints": [
            {
              "order": [
                "00",
                "01",
                "02"
              ]
            }
          ],
        }
      ],
    },
    {
      "id": "site",
      "gameId": "2-OldSite",
      "name": "Old Site",
      "sides": [
        {
          "file": "2-OldSite",
          "checkpoints": [
            {
              "order": [
                "start",
                "s0",
                "s1",
                "s2",
                "0",
                "1",
                "d0",
                "d7",
                "d8",
                "d3",
                "d2",
                "d9",
                "d1",
                "d6",
                "d4",
                "d5",
                "3x"
              ]
            },
            {
              "name": "Intervention",
              "abv": "IV",
              "order": [
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "9b",
                "10",
                "2",
                "11",
                "12b",
                "12c",
                "12d",
                "12",
                "13"
              ]
            },
            {
              "name": "Awake",
              "abv": "AW",
              "order": [
                "end_0",
                "end_s0",
                "end_s1",
                "end_1",
                "end_2",
                "end_3",
                "end_4",
                "end_3b",
                "end_3cb",
                "end_3c",
                "end_5",
                "end_6"
              ]
            },
          ],
        },
        {
          "file": "2H-OldSite",
          "checkpoints": [
            {
              "order": [
                "start",
                "00",
                "01",
                "01b",
                "02b",
                "02"
              ]
            }
            {
              "name": "Combination Lock",
              "abv": "CL",
              "order": [
                "03",
                "04",
                "05",
                "06",
                "07"
              ]
            },
            {
              "name": "Dream Altar",
              "abv": "DA",
              "order": [
                "08b",
                "08",
                "09",
                "10",
                "11",
                "end"
              ]
            },
          ],
        },
        {
          "file": "2X-OldSite",
          "checkpoints": [
            {
              "order": [
                "00",
                "01",
                "02"
              ]
            }
          ],
        }
      ],
    },
    {
      "id": "resort",
      "gameId": "3-CelestialResort",
      "name": "Celestial Resort",
      "sides": [
        {
          "file": "3-CelestialResort",
          "checkpoints": [
            {
              "order": [
                "s0",
                "s1",
                "s2",
                "s3",
                "0x-a",
                "00-a",
                "02-a",
                "02-b",
                "01-b",
                "00-b",
                "00-c",
                "0x-b",
                "03-a",
                "04-b",
                "05-a",
                "06-a",
                "07-a",
                "07-b",
                "06-b",
                "06-c",
                "05-c",
                "08-c",
                "08-b"
              ]
            },
            {
              "name": "Huge Mess",
              "abv": "HM",
              "order": [
                "08-a",
                "09-b",
                "11-x",
                "11-y",
                "12-y",
                "11-z",
                "10-z",
                "10-y",
                "10-x",
                "10-c",
                "11-c",
                "12-c",
                "12-d",
                "11-d",
                "10-d",
                "11-b",
                "12-b",
                "13-b",
                "13-a",
                "13-x",
                "12-x",
                "11-a",
                "08-x"
              ]
            },
            {
              "name": "Elevator Shaft",
              "abv": "ES",
              "order": [
                "09-d",
                "08-d",
                "06-d",
                "04-d",
                "04-c",
                "02-c",
                "03-b",
                "01-c",
                "02-d"
              ]
            },
            {
              "name": "Presidential Suite",
              "abv": "PS",
              "order": [
                "00-d",
                "roof00",
                "roof01",
                "roof02",
                "roof03",
                "roof04",
                "roof05",
                "roof06b",
                "roof06",
                "roof07"
              ]
            },
          ],
        },
        {
          "file": "3H-CelestialResort",
          "checkpoints": [
            {
              "order": [
                "00",
                "back",
                "01",
                "02",
                "03",
                "04",
                "05"
              ]
            },
            {
              "name": "Staff Quarters",
              "abv": "SQ",
              "order": [
                "06",
                "07",
                "08",
                "09",
                "10"
              ]
            },
            {
              "name": "Library",
              "abv": "LB",
              "order": [
                "11",
                "13",
                "14",
                "15",
                "12"
              ]
            },
            {
              "name": "Rooftop",
              "abv": "RT",
              "order": [
                "16",
                "17",
                "18",
                "19",
                "21",
                "20",
                "end"
              ]
            },
          ],
        },
        {
          "file": "3X-CelestialResort",
          "checkpoints": [
            {
              "order": [
                "00",
                "01",
                "02"
              ]
            },
          ],
        }
      ],
    },
    {
      "id": "ridge",
      "gameId": "4-GoldenRidge",
      "name": "Golden Ridge",
      "sides": [
        {
          "file": "4-GoldenRidge",
          "checkpoints": [
            {
              "order": [
                "a-00",
                "a-01",
                "a-01x",
                "a-02",
                "a-03",
                "a-04",
                "a-05",
                "a-06",
                "a-07",
                "a-08",
                "a-10",
                "a-11",
                "a-09"
              ]
            },
            {
              "name": "Shrine",
              "abv": "SH",
              "order": [
                "b-00",
                "b-01",
                "b-04",
                "b-06",
                "b-07",
                "b-03",
                "b-02",
                "b-sec",
                "b-secb",
                "b-05",
                "b-08b",
                "b-08"
              ]
            },
            {
              "name": "Old Trail",
              "abv": "OT",
              "order": [
                "c-00",
                "c-01",
                "c-02",
                "c-04",
                "c-05",
                "c-06",
                "c-06b",
                "c-09",
                "c-07",
                "c-08",
                "c-10"
              ]
            },
            {
              "name": "Cliff Face",
              "abv": "CF",
              "order": [
                "d-00",
                "d-00b",
                "d-01",
                "d-02",
                "d-03",
                "d-04",
                "d-05",
                "d-06",
                "d-07",
                "d-08",
                "d-09",
                "d-10"
              ]
            },
          ],
        },
        {
          "file": "4H-GoldenRidge",
          "checkpoints": [
            {
              "order": [
                "a-00",
                "a-01",
                "a-02",
                "a-03",
                "a-04"
              ]
            },
            {
              "name": "Stepping Stones",
              "abv": "SS",
              "order": [
                "b-00",
                "b-01",
                "b-02",
                "b-03",
                "b-04"
              ]
            },
            {
              "name": "Gusty Canyon",
              "abv": "GC",
              "order": [
                "c-00",
                "c-01",
                "c-02",
                "c-03",
                "c-04"
              ]
            },
            {
              "name": "Eye of the Storm",
              "abv": "EOTS",
              "order": [
                "d-00",
                "d-01",
                "d-02",
                "d-03",
                "end"
              ]
            },
          ],
        },
        {
          "file": "4X-GoldenRidge",
          "checkpoints": [
            {
              "order": [
                "00",
                "01",
                "02"
              ]
            }
          ],
        }
      ],
    },
    {
      "id": "temple",
      "gameId": "5-MirrorTemple",
      "name": "Mirror Temple",
      "sides": [
        {
          "file": "5-MirrorTemple",
          "checkpoints": [
            {
              "order": [
                "a-00x",
                "a-00b",
                "a-00d",
                "a-00c",
                "a-00",
                "a-01",
                "a-02",
                "a-03",
                "a-04",
                "a-05",
                "a-06",
                "a-07",
                "a-08",
                "a-10",
                "a-09",
                "a-11",
                "a-12",
                "a-15",
                "a-14",
                "a-13"
              ]
            },
            {
              "name": "Depths",
              "abv": "DEP",
              "order": [
                "b-00",
                "b-18",
                "b-01",
                "b-01c",
                "b-20",
                "b-21",
                "b-01b",
                "b-02",
                "b-03",
                "b-05",
                "b-04",
                "b-07",
                "b-08",
                "b-09",
                "b-10",
                "b-11",
                "b-12",
                "b-13",
                "b-17",
                "b-22",
                "b-06",
                "b-19",
                "b-14",
                "b-15",
                "b-16",
                "void"
              ]
            },
            {
              "name": "Unravelling",
              "abv": "UR",
              "order": [
                "c-00",
                "c-01",
                "c-01b",
                "c-01c",
                "c-08b",
                "c-08",
                "c-10",
                "c-12",
                "c-07",
                "c-11",
                "c-09",
                "c-13"
              ]
            },
            {
              "name": "Search",
              "abv": "SCH",
              "order": [
                "d-00",
                "d-01",
                "d-09",
                "d-04",
                "d-05",
                "d-06",
                "d-07",
                "d-02",
                "d-03",
                "d-15",
                "d-19",
                "d-19b",
                "d-10",
                "d-20"
              ]
            },
            {
              "name": "Rescue",
              "abv": "RS",
              "order": [
                "e-00",
                "e-01",
                "e-02",
                "e-03",
                "e-04",
                "e-06",
                "e-05",
                "e-07",
                "e-08",
                "e-09",
                "e-10",
                "e-11"
              ]
            }
          ],
        },
        {
          "file": "5H-MirrorTemple",
          "checkpoints": [
            {
              "order": [
                "start",
                "a-00",
                "a-01",
                "a-02"
              ]
            },
            {
              "name": "Central Chamber",
              "abv": "CC",
              "order": [
                "b-00",
                "b-01",
                "b-04",
                "b-02",
                "b-05",
                "b-06",
                "b-07",
                "b-03",
                "b-08",
                "b-09"
              ]
            },
            {
              "name": "Through the Mirror",
              "abv": "TTM",
              "order": [
                "c-00",
                "c-01",
                "c-02",
                "c-03",
                "c-04"
              ]
            },
            {
              "name": "Mix Master",
              "abv": "MM",
              "order": [
                "d-00",
                "d-01",
                "d-02",
                "d-03",
                "d-04",
                "d-05"
              ]
            },
          ],
        },
        {
          "file": "5X-MirrorTemple",
          "checkpoints": [
            {
              "order": [
                "00",
                "01",
                "02"
              ]
            }
          ],
        }
      ],
    },
    {
      "id": "reflection",
      "gameId": "6-Reflection",
      "name": "Reflection",
      "sides": [
        {
          "file": "6-Reflection",
          "checkpoints": [
            {
              "order": [
                "start"
              ]
            },
            {
              "name": "Lake",
              "abv": "LK",
              "order": [
                "00",
                "01",
                "02",
                "03",
                "02b"
              ]
            },
            {
              "name": "Hollows",
              "abv": "HL",
              "order": [
                "04",
                "04b",
                "04c",
                "04d",
                "04e",
                "05",
                "06",
                "07",
                "08a",
                "08b",
                "09",
                "10a",
                "10b",
                "11",
                "12a",
                "12b",
                "13",
                "14a",
                "14b",
                "15",
                "16a",
                "16b",
                "17",
                "18a",
                "18b",
                "19",
                "20"
              ]
            },
            {
              "name": "Reflection",
              "abv": "RF",
              "order": [
                "b-00",
                "b-00b",
                "b-00c",
                "b-01",
                "b-02",
                "b-02b",
                "b-03"
              ]
            },
            {
              "name": "Rock Bottom",
              "abv": "RB",
              "order": [
                "boss-00",
                "boss-01",
                "boss-02",
                "boss-03",
                "boss-04",
                "boss-05",
                "boss-06",
                "boss-07",
                "boss-08",
                "boss-09",
                "boss-10",
                "boss-11",
                "boss-12",
                "boss-13",
                "boss-14",
                "boss-15",
                "boss-16",
                "boss-17",
                "boss-18",
                "boss-19",
                "boss-20"
              ]
            },
            {
              "name": "Resolution",
              "abv": "RL",
              "order": [
                "after-00",
                "after-01",
                "after-02"
              ]
            },
          ],
        },
        {
          "file": "6H-Reflection",
          "checkpoints": [
            {
              "order": [
                "a-00",
                "a-01",
                "a-02",
                "a-03",
                "a-04",
                "a-05",
                "a-06"
              ]
            },
            {
              "name": "Reflection",
              "abv": "RF",
              "order": [
                "b-00",
                "b-01",
                "b-02",
                "b-03",
                "b-04",
                "b-05",
                "b-06",
                "b-07",
                "b-08",
                "b-10"
              ]
            },
            {
              "name": "Rock Bottom",
              "abv": "RB",
              "order": [
                "c-00",
                "c-01",
                "c-02",
                "c-03",
                "c-04"
              ]
            },
            {
              "name": "Reprieve",
              "abv": "RP",
              "order": [
                "d-00",
                "d-01",
                "d-02",
                "d-03",
                "d-04",
                "d-05"
              ]
            },
          ],
        },
        {
          "file": "6X-Reflection",
          "checkpoints": [
            {
              "order": [
                "00",
                "01",
                "02"
              ]
            },
          ],
        }
      ],
    },
    {
      "id": "summit",
      "gameId": "7-Summit",
      "name": "The Summit",
      "sides": [
        {
          "file": "7-Summit",
          "checkpoints": [
            {
              "order": [
                "a-00",
                "a-01",
                "a-02",
                "a-02b",
                "a-03",
                "a-04",
                "a-04b",
                "a-05",
                "a-06"
              ]
            },
            {
              "name": "500 M",
              "abv": "0.5K",
              "order": [
                "b-00",
                "b-01",
                "b-02",
                "b-02b",
                "b-02e",
                "b-02c",
                "b-02d",
                "b-03",
                "b-04",
                "b-05",
                "b-06",
                "b-07",
                "b-08",
                "b-09"
              ]
            },
            {
              "name": "1000 M",
              "abv": "1K",
              "order": [
                "c-00",
                "c-01",
                "c-02",
                "c-03",
                "c-03b",
                "c-04",
                "c-05",
                "c-06",
                "c-06b",
                "c-06c",
                "c-07",
                "c-07b",
                "c-08",
                "c-09"
              ]
            },
            {
              "name": "1500 M",
              "abv": "1.5K",
              "order": [
                "d-00",
                "d-01",
                "d-01b",
                "d-01c",
                "d-01d",
                "d-02",
                "d-03",
                "d-03b",
                "d-04",
                "d-05",
                "d-05b",
                "d-06",
                "d-07",
                "d-08",
                "d-09",
                "d-10",
                "d-10b",
                "d-11"
              ]
            },
            {
              "name": "2000 M",
              "abv": "2K",
              "order": [
                "e-00b",
                "e-00",
                "e-01",
                "e-01b",
                "e-01c",
                "e-02",
                "e-03",
                "e-04",
                "e-05",
                "e-06",
                "e-07",
                "e-08",
                "e-09",
                "e-11",
                "e-12",
                "e-10",
                "e-10b",
                "e-13"
              ]
            },
            {
              "name": "2500 M",
              "abv": "2.5K",
              "order": [
                "f-00",
                "f-01",
                "f-02",
                "f-02b",
                "f-04",
                "f-03",
                "f-05",
                "f-06",
                "f-07",
                "f-08",
                "f-08b",
                "f-08d",
                "f-08c",
                "f-09",
                "f-10",
                "f-10b",
                "f-11"
              ]
            },
            {
              "name": "3000 M",
              "abv": "3K",
              "order": [
                "g-00",
                "g-00b",
                "g-01",
                "g-02",
                "g-03"
              ]
            }
          ],
        },
        {
          "file": "7H-Summit",
          "checkpoints": [
            {
              "order": [
                "a-00",
                "a-01",
                "a-02",
                "a-03"
              ]
            },
            {
              "name": "500 M",
              "abv": "0.5K",
              "order": [
                "b-00",
                "b-01",
                "b-02",
                "b-03"
              ]
            },
            {
              "name": "1000 M",
              "abv": "1K",
              "order": [
                "c-01",
                "c-00",
                "c-02",
                "c-03"
              ]
            },
            {
              "name": "1500 M",
              "abv": "1.5K",
              "order": [
                "d-00",
                "d-01",
                "d-02",
                "d-03"
              ]
            },
            {
              "name": "2000 M",
              "abv": "2K",
              "order": [
                "e-00",
                "e-01",
                "e-02",
                "e-03"
              ]
            },
            {
              "name": "2500 M",
              "abv": "2.5K",
              "order": [
                "f-00",
                "f-01",
                "f-02",
                "f-03"
              ]
            },
            {
              "name": "3000 M",
              "abv": "3K",
              "order": [
                "g-00",
                "g-01",
                "g-02",
                "g-03"
              ]
            }
          ],
        },
        {
          "file": "7X-Summit",
          "checkpoints": [
            {
              "order": [
                "01",
                "02",
                "03"
              ]
            },
          ],
        }
      ],
    },
    {
      "id": "epilogue",
      "gameId": "8-Epilogue",
      "name": "Epilogue",
      "sides": [
        {
          "file": "8-Epilogue",
          "checkpoints": [
            {
              "order": [
                "outside",
                "inside",
                "bridge",
                "secret"
              ]
            },
          ],
        }
      ],
    },
    {
      "id": "core",
      "gameId": "9-Core",
      "name": "Core",
      "sides": [
        {
          "file": "9-Core",
          "checkpoints": [
            {
              "order": [
                "0x",
                "00",
                "01",
                "02"
              ]
            },
            {
              "name": "Into the Core",
              "abv": "ITC",
              "order": [
                "a-00",
                "a-01",
                "a-02",
                "a-03",
                "b-00",
                "b-01",
                "b-02",
                "b-03",
                "b-04",
                "b-05",
                "b-06",
                "b-07b",
                "b-07"
              ]
            },
            {
              "name": "Hot and Cold",
              "abv": "HAC",
              "order": [
                "c-00",
                "c-00b",
                "c-01",
                "c-02",
                "c-03",
                "c-03b",
                "c-04"
              ]
            },
            {
              "name": "Heart of the Mountain",
              "abv": "HOTM",
              "order": [
                "d-00",
                "d-01",
                "d-02",
                "d-03",
                "d-04",
                "d-05",
                "d-06",
                "d-07",
                "d-08",
                "d-09",
                "d-10",
                "d-10b",
                "d-10c",
                "d-11",
                "space"
              ]
            }
          ],
        },
        {
          "file": "9H-Core",
          "checkpoints": [
            {
              "order": [
                "00",
                "01"
              ]
            },
            {
              "name": "Into the Core",
              "abv": "ITC",
              "order": [
                "a-00",
                "a-01",
                "a-02",
                "a-03",
                "a-04",
                "a-05"
              ]
            },
            {
              "name": "Burning or Freezing",
              "abv": "BOF",
              "order": [
                "b-00",
                "b-01",
                "b-02",
                "b-03",
                "b-04",
                "b-05"
              ]
            },
            {
              "name": "Heartbeat",
              "abv": "HB",
              "order": [
                "c-01",
                "c-02",
                "c-03",
                "c-04",
                "c-05",
                "c-06",
                "c-08",
                "c-07",
                "space"
              ]
            },
          ],
        },
        {
          "file": "9X-Core",
          "checkpoints": [
            {
              "order": [
                "intro",
                "00",
                "01",
                "02"
              ]
            },
          ],
        }
      ],
    },
    {
      "id": "farewell",
      "gameId": "LostLevels",
      "name": "Farewell",
      "sides": [
        {
          "file": "LostLevels",
          "checkpoints": [
            {
              "order": [
                "intro-00-past",
                "intro-01-future",
                "intro-02-launch",
                "intro-03-space"
              ]
            },
            {
              "name": "Singular",
              "abv": "SI",
              "order": [
                "a-00",
                "a-01",
                "a-02",
                "a-03",
                "a-04",
                "a-05",
                "b-00",
                "b-01",
                "b-02",
                "b-03",
                "b-04",
                "b-05",
                "b-06",
                "b-07"
              ]
            },
            {
              "name": "Power Source",
              "abv": "PS",
              "order": [
                "c-00",
                "c-alt-00",
                "c-alt-01",
                "c-00b",
                "c-01",
                "c-02",
                "c-03",
                "d-00",
                "d-01",
                "d-02",
                "d-03",
                "d-04",
                "d-05",
                "e-00y",
                "e-00yb"
              ]
            },
            {
              "name": "Remembered",
              "abv": "RM",
              "order": [
                "e-00z",
                "e-00",
                "e-00b",
                "e-01",
                "e-02",
                "e-03",
                "e-04",
                "e-05",
                "e-05b",
                "e-05c",
                "e-06",
                "e-07",
                "e-08"
              ]
            },
            {
              "name": "Event Horizon",
              "abv": "EH",
              "order": [
                "f-door",
                "f-00",
                "f-01",
                "f-02",
                "f-03",
                "f-04",
                "f-05",
                "f-06",
                "f-07",
                "f-08",
                "f-09",
                "g-00",
                "g-01",
                "g-03",
                "g-02",
                "g-04",
                "g-05",
                "g-06"
              ]
            },
            {
              "name": "Determination",
              "abv": "DT",
              "order": [
                "h-00b",
                "h-00",
                "h-01",
                "h-02",
                "h-03",
                "h-03b",
                "h-04",
                "h-04b",
                "h-05",
                "h-06",
                "h-06b",
                "h-07",
                "h-08",
                "h-09",
                "h-10"
              ]
            },
            {
              "name": "Stubbornness",
              "abv": "ST",
              "order": [
                "i-00",
                "i-00b",
                "i-01",
                "i-02",
                "i-03",
                "i-04",
                "i-05"
              ]
            },
            {
              "name": "Reconciliation",
              "abv": "RC",
              "order": [
                "j-00",
                "j-00b",
                "j-01",
                "j-02",
                "j-03",
                "j-04",
                "j-05",
                "j-06",
                "j-07",
                "j-08",
                "j-09",
                "j-10",
                "j-11",
                "j-12",
                "j-13",
                "j-14",
                "j-14b",
                "j-15"
              ]
            },
            {
              "name": "Farewell",
              "abv": "FW",
              "order": [
                "j-16",
                "j-17",
                "j-18",
                "j-19",
                "end-golden"
              ]
            },
          ],
        },
      ],
    },
  ]
}

const inputDir = "import";
const outputDir = "output";

// Store the level data.
const sides = [];

// Entities to include in data.
const validEntities = new Set(["player", "strawberry", "cassette", "blackGem", "summitGem"]);
const entityTypes = new Map([
  ["player", "p"],
  ["strawberry", "s"],
  ["cassette", "c"],
  ["blackGem", "h"],
  ["summitGem", "g"],
]);

const sideMap

// Read and transform the map data.
fs.readdirSync(inputDir, {withFileTypes}).forEach(async file => {
  console.log(`Reading file ${file}`)

  const {stdout} = await exec(`julia extract.jl ${inputDir}`);
  const data = JSON.parse(stdout);
  
  const checkpoints = [];
  
  const rooms = data.rooms.reduce((acc, [id, {entities, position: [x, y], size}]) => {
    acc.push({
      i: id,
      s: size,
      p: {x, y},
      e: entities.filter(entity => {
        if (entity.name === "checkpoint") {
          checkpoints.push({id, name: "", abv: ""})
        }        
        return validEntities.has(entity.name);
      }).map(({name, x, y, checkpointID, order}) => ({
        t: entityTypes.get(name),
        x,
        y,
        ...checkpointID && {c: checkpointID},
        ...order && {o: order},
      })),
    })
  }, []);

  // Transform;
  const side = {
    g: data.package,
    a: 0,
    s: 0,
    c: checkpoints,
    r: rooms,
  };


  sides.push(side);
});

// Format the output data.
const outputData = JSON.stringify({
  i: "",
  g: "",
  n: "",
  d: "",
  l: sides,
}, null, 2);

// Write the output data.
fs.writeFileSync(`${outputDir}/${areaKey}.json`, outputData);