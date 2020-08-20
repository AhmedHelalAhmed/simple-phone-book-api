const fs = require("fs");

exports.log = (message) => {
  console.log(message);
};

exports.getFileContentParsedSync = (path) => {
  const dataContent = fs.readFileSync(path);
  let data = [];
  if (dataContent.toString()) {
    data = JSON.parse(dataContent);
  }
  return data;
};

exports.readFileAsync = (path, callback) => {
  fs.readFile(path, callback);
};

exports.WriteIntoFileAsync = (path, content, callback) => {
  fs.writeFile(path, content, "utf8", callback);
};
