var { PythonShell, } = require("python-shell");

const options = {
  mode: "json",
  pythonPath: "/usr/bin/python3",
  pythonOptions: ["-u"],
  scriptPath: "/workspace/src/script",
};

var shell = new PythonShell("script.py", options);
const json = {
    "name": "tachiba7",
    "text": "Hello World!",
};

shell.send(json);

shell.on("message", data => {
    console.log(JSON.stringify(data, null, 2));
});

shell.end();