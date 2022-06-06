import sys, json
from googletrans import Translator

def translate(intext):
    translator = Translator()
    transToJP = translator.translate(intext, dest="ja")
    transToEN = translator.translate(intext, dest="en")
    transToKO = translator.translate(intext, dest="ko")
    transToCN = translator.translate(intext, dest="zh-cn")
    transToTW = translator.translate(intext, dest="zh-tw")
    return {
        "JP": transToJP.text,
        "EN": transToEN.text,
        "KO": transToKO.text,
        "CN": transToCN.text,
        "TW": transToTW.text,
    }

data = json.loads(sys.stdin.readline())
response = {
    "input": data["text"],
    "result": translate(data["text"]),
    }
print(json.dumps(response))