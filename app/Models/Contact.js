const config = require("config");
const dataPath = config.get("dataPath");
const helpers = require("../../app/Helpers/helpers");

const insertContact = (input, data, callback) => {
  const insertedContact = {
    id: data.length + 1,
    name: input.name,
    address: input.address,
    email: input.email,
    phoneNumbers: input.phoneNumbers,
  };
  data.push(insertedContact);
  helpers.WriteIntoFileAsync(dataPath, JSON.stringify(data), () => {
    callback(
      {
        contact: insertedContact,
      },
      true,
      "sucess"
    );
  });
};
module.exports.allAsync = (callback) => {
  helpers.getFileContentParsedASync(dataPath, callback);
};
module.exports.create = (input, callback) => {
  helpers.readFileAsync(dataPath, (error, fileContent) => {
    let data = [];
    if (error) {
      helpers.WriteIntoFileAsync(dataPath, JSON.stringify([]), () => {});
      insertContact(input, data, callback);
    } else {
      if (fileContent.toString()) {
        data = JSON.parse(fileContent);
      }
      insertContact(input, data, callback);
    }
  });
};

module.exports.find = (id, callback) => {
  helpers.readFileAsync(dataPath, (error, fileContent) => {
    let data = [];
    if (error) {
      helpers.WriteIntoFileAsync(dataPath, JSON.stringify([]), () => {});
      callback(
        {
          contact: undefined,
        },
        true,
        "sucess"
      );
    } else {
      if (fileContent.toString()) {
        data = JSON.parse(fileContent);
      }
      callback(
        {
          contact: data.find((contact) => contact.id === id),
        },
        true,
        "sucess"
      );
    }
  });
};

module.exports.delete = (id, callback) => {
  helpers.readFileAsync(dataPath, (error, fileContent) => {
    let data = [];
    if (error) {
      helpers.WriteIntoFileAsync(dataPath, JSON.stringify([]), () => {});
      callback(
        {
          contact: undefined,
        },
        true,
        "sucess"
      );
    } else {
      if (fileContent.toString()) {
        data = JSON.parse(fileContent);
      }
      const targetContact = data.find((contact) => parseInt(contact.id) === id);
      if (!targetContact) {
        callback(
          {
            contact: targetContact,
          },
          false,
          "failed"
        );
      } else {
        data.splice(data.indexOf(targetContact), 1);
        helpers.WriteIntoFileAsync(dataPath, JSON.stringify(data), () => {
          callback(
            {
              contact: targetContact,
            },
            true,
            "success"
          );
        });
      }
    }
  });
};

module.exports.update = (id, input, callback) => {
  helpers.readFileAsync(dataPath, (error, fileContent) => {
    let data = [];

    if (error) {
      helpers.WriteIntoFileAsync(dataPath, JSON.stringify([]), () => {});
      callback(
        {
          contact: undefined,
        },
        true,
        "sucess"
      );
    } else {
      if (fileContent.toString()) {
        data = JSON.parse(fileContent);
      }
      const targetContact = data.find((contact) => contact.id === id);
      if (!targetContact) {
        callback(
          {
            contact: targetContact,
          },
          true,
          "sucess"
        );
      } else {
        data[data.indexOf(targetContact)]["name"] = input.name;
        data[data.indexOf(targetContact)]["address"] = input.address;
        data[data.indexOf(targetContact)]["email"] = input.email;
        data[data.indexOf(targetContact)]["phoneNumbers"] = input.phoneNumbers;

        helpers.WriteIntoFileAsync(dataPath, JSON.stringify(data), () => {
          callback(
            {
              contact: data[data.indexOf(targetContact)],
            },
            true,
            "success"
          );
        });
      }
    }
  });
};

module.exports.where = (queries, callback) => {
  helpers.readFileAsync(dataPath, (error, fileContent) => {
    let data = [];

    if (error) {
      helpers.WriteIntoFileAsync(dataPath, JSON.stringify([]), () => {
        callback(
          {
            contacts: data,
          },
          true,
          "success"
        );
      });
    } else {
      if (fileContent.toString()) {
        data = JSON.parse(fileContent);
      }
      queries = queries.filter((item) => item.value !== undefined);
      if (!queries.length) {
        callback(
          {
            contacts: [],
          },
          true,
          "success"
        );
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

        callback(
          {
            contacts: contacts,
          },
          true,
          "success"
        );
      }
    }
  });
};
