const config = require("config");
const dataPath = config.get("dataPath");
const helpers = require("../../app/Helpers/helpers");
module.exports.allSync = () => {
  return helpers.getFileContentParsedSync(dataPath);
};
module.exports.create = (inputs) => {
  helpers.readFileAsync(dataPath, (error, fileContent) => {
    let data = [];
    if (fileContent.toString()) {
      data = JSON.parse(fileContent);
    }
    data.push({
      id: data.length + 1,
      name: inputs.name,
      address: inputs.address,
      email: inputs.email,
      phoneNumbers: inputs.phoneNumbers,
    });
    helpers.WriteIntoFileAsync(dataPath, JSON.stringify(data), () => {
      helpers.log("write done sucessfully");
    });
  });
};
module.exports.find = (id) => {
  let data = this.allSync();
  return data.find((phoneBook) => phoneBook.id === id);
};
