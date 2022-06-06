import sys, json

data = json.loads(sys.stdin.readline())
response = {
    "result": data["text"] + " " + data["name"]
    }
print(json.dumps(response))
