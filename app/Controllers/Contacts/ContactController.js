const Conact = require("../../../app/Models/Contact");

module.exports.index = (req, res) => {
  Conact.allAsync((contacts) => {
    res.send({
      status: true,
      message: "Sucess",
      data: {
        contacts: contacts,
      },
    });
  });
};

module.exports.store = (req, res) => {
  Conact.create({
    name: req.body.name,
    address: req.body.address,
    email: req.body.email,
    phoneNumbers: req.body.phoneNumbers,
  });

  res.send({
    status: true,
    message: "Sucess",
    data: {},
  });
};

module.exports.show = (req, res) => {
  let contact = Conact.find(parseInt(req.params.id));
  if (!contact) {
    res.status(404).send();
  }
  res.send({
    status: true,
    message: "Sucess",
    data: {
      contact: contact,
    },
  });
};

module.exports.destroy = (req, res) => {
  let contact = Conact.find(parseInt(req.params.id));
  if (!contact) {
    res.status(404).send();
  }
  Conact.delete(parseInt(req.params.id));
  res.send({
    status: true,
    message: "Sucess",
    data: {},
  });
};

module.exports.update = (req, res) => {
  let contact = Conact.find(parseInt(req.params.id));
  if (!contact) {
    res.status(404).send();
  }
  Conact.update(contact, {
    name: req.body.name,
    address: req.body.address,
    email: req.body.email,
    phoneNumbers: req.body.phoneNumbers,
  });

  res.send({
    status: true,
    message: "Sucess",
    data: {},
  });
};
