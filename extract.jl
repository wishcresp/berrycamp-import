using Maple
using JSON

# Convert map data to JSON
print(JSON.json(Maple.loadMap(ARGS[1])))