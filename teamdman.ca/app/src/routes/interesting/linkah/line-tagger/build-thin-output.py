import json
import sys

res = open(sys.argv[1], "r")
data = json.load(res)
out = open("output-thin.json", "w")
json.dump({k:v["Body"]["results"][0]["text"].strip() for k,v in data.items()}, out, indent=4)