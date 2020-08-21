const config = require("config");
const dataPath = config.get("dataPath");
const helpers = require("../../app/Helpers/helpers");

module.exports.allSync = () => {
  return helpers.getFileContentParsedSync(dataPath);
};
module.exports.allAsync = (callback) => {
  helpers.getFileContentParsedASync(dataPath, callback);
};
module.exports.create = (input) => {
  helpers.readFileAsync(dataPath, (error, fileContent) => {
    let data = [];
    if (fileContent.toString()) {
      data = JSON.parse(fileContent);
    }
    data.push({
      id: data.length + 1,
      name: input.name,
      address: input.address,
      email: input.email,
      phoneNumbers: input.phoneNumbers,
    });
    helpers.WriteIntoFileAsync(dataPath, JSON.stringify(data), () => {
      helpers.log("Write done sucessfully");
    });
  });
};

module.exports.find = (id) => {
  let data = this.allSync();
  return data.find((phoneBook) => phoneBook.id === id);
};

module.exports.delete = (id) => {
  helpers.readFileAsync(dataPath, (error, fileContent) => {
    let data = [];
    if (fileContent.toString()) {
      data = JSON.parse(fileContent);
    }
    const contact = data.find((contact) => contact.id === id);
    data.splice(data.indexOf(contact), 1);
    helpers.WriteIntoFileAsync(dataPath, JSON.stringify(data), () => {
      helpers.log("Delete done sucessfully");
    });
  });
};

module.exports.update = (contact, input) => {
  helpers.readFileAsync(dataPath, (error, fileContent) => {
    let data = JSON.parse(fileContent);
    const id = contact.id;
    const targetContact = data.find((contact) => contact.id === id);
    data[data.indexOf(targetContact)]["name"] = input.name;
    data[data.indexOf(targetContact)]["address"] = input.address;
    data[data.indexOf(targetContact)]["email"] = input.email;
    data[data.indexOf(targetContact)]["phoneNumbers"] = input.phoneNumbers;
    helpers.WriteIntoFileAsync(dataPath, JSON.stringify(data), () => {
      helpers.log("Update done sucessfully");
    });
  });
};

module.exports.where = (queries) => {
  let data = this.allSync();

  return data.filter((contact) => {
    let valid = true;
    queries.forEach((query) => {
      if (query.value && !contact[query.name].includes(query.value)) {
        valid = false;
      }
    });

    return valid;
  });
};
