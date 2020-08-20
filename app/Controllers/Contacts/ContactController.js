const Conact = require("../../../app/Models/Contact");

module.exports.index = (req, res) => {
  res.send({
    status: true,
    message: "Sucess",
    data: {
      contacts: Conact.allSync(),
    },
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
