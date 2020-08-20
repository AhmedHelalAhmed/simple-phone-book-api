const fs = require("fs");

exports.log = (message) => {
  console.log(message);
};

exports.getFileContentParsedSync = (path) => {
  const dataContent = fs.readFileSync(path);
  return JSON.parse(dataContent);
};

exports.readFileAsync = (path, callback) => {
  fs.readFile(path, callback);
};

exports.WriteIntoFileAsync = (path, content, callback) => {
  fs.writeFile(path, content, "utf8", callback);
};
