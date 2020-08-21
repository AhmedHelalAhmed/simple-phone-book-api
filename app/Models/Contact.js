const config = require("config");
const dataPath = config.get("dataPath");
const helpers = require("../../app/Helpers/helpers");

module.exports.allSync = () => {
  return helpers.getFileContentParsedSync(dataPath);
};
module.exports.allAsync = (callback) => {
  helpers.getFileContentParsedASync(dataPath, callback);
};
module.exports.create = (input, callback) => {
  helpers.readFileAsync(dataPath, (error, fileContent) => {
    let data = [];
    if (fileContent.toString()) {
      data = JSON.parse(fileContent);
    }
    insertedContact = {
      id: data.length + 1,
      name: input.name,
      address: input.address,
      email: input.email,
      phoneNumbers: input.phoneNumbers,
    };
    data.push(insertedContact);
    helpers.WriteIntoFileAsync(dataPath, JSON.stringify(data), () => {
      callback(insertedContact, "sucess");
    });
  });
};

module.exports.find = (id, callback) => {
  helpers.readFileAsync(dataPath, (error, fileContent) => {
    let data = [];
    if (fileContent.toString()) {
      data = JSON.parse(fileContent);
    }
    const contact = data.find((contact) => contact.id === id);
    callback(contact, true, "sucess");
  });
};

module.exports.delete = (id, callback) => {
  helpers.readFileAsync(dataPath, (error, fileContent) => {
    let data = [];
    if (fileContent.toString()) {
      data = JSON.parse(fileContent);
    }
    const targetContact = data.find((contact) => parseInt(contact.id) === id);
    if (!targetContact) {
      callback(targetContact, false, "failed");
    } else {
      data.splice(data.indexOf(targetContact), 1);
      helpers.WriteIntoFileAsync(dataPath, JSON.stringify(data), () => {
        callback(targetContact, true, "success");
      });
    }
  });
};

module.exports.update = (id, input, callback) => {
  helpers.readFileAsync(dataPath, (error, fileContent) => {
    let data = [];
    if (fileContent.toString()) {
      data = JSON.parse(fileContent);
    }
    const targetContact = data.find((contact) => contact.id === id);
    data[data.indexOf(targetContact)]["name"] = input.name;
    data[data.indexOf(targetContact)]["address"] = input.address;
    data[data.indexOf(targetContact)]["email"] = input.email;
    data[data.indexOf(targetContact)]["phoneNumbers"] = input.phoneNumbers;

    helpers.WriteIntoFileAsync(dataPath, JSON.stringify(data), () => {
      callback(data[data.indexOf(targetContact)], "success", true);
    });
  });
};

module.exports.where = (queries, callback) => {
  helpers.readFileAsync(dataPath, (error, fileContent) => {
    let data = [];
    if (fileContent.toString()) {
      data = JSON.parse(fileContent);
    }
    queries = queries.filter((item) => item.value !== undefined);
    if (!queries.length) {
      callback([], true, "success");
    } else {
      const contacts = data.filter((contact) => {
        let valid = true;
        queries.forEach((query) => {
          if (query.value && !contact[query.name].includes(query.value)) {
            valid = false;
          }
        });

        return valid;
      });

      callback(contacts, true, "success");
    }
  });
};
