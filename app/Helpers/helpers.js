const fs = require("fs");

exports.log = (message) => {
  console.log(message);
};

exports.getFileContentParsedASync = (path, callback) => {
  fs.readFile(path, (error, dataContent) => {
    let data = [];
    if (dataContent.toString()) {
      data = JSON.parse(dataContent);
    }

    callback(
      {
        contacts: data,
      },
      true,
      "success"
    );
  });
};

exports.readFileAsync = (path, callback) => {
  fs.readFile(path, callback);
};

exports.WriteIntoFileAsync = (path, content, callback) => {
  fs.writeFile(path, content, "utf8", callback);
};
