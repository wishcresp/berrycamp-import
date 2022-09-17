using Maple
using JSON

# Load the map with Maple and write the JSON to stdout.
print(JSON.json(Maple.loadMap(ARGS[1])))