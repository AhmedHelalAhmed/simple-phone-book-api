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
  Conact.create(
    {
      name: req.body.name,
      address: req.body.address,
      email: req.body.email,
      phoneNumbers: req.body.phoneNumbers,
    },
    (contact, message) => {
      res.send({
        status: true,
        message: message,
        data: {
          contact: contact,
        },
      });
    }
  );
};

module.exports.show = (req, res) => {
  let contact = Conact.find(parseInt(req.params.id));
  if (!contact) {
    res.status(404).send();
  } else {
    res.send({
      status: true,
      message: "Sucess",
      data: {
        contact: contact,
      },
    });
  }
};

module.exports.destroy = (req, res) => {
  Conact.delete(parseInt(req.params.id), (contact, status, message) => {
    if (!contact) {
      res.status(404).send();
    } else {
      res.send({
        status: status,
        message: message,
        data: {
          contact: contact,
        },
      });
    }
  });
};

module.exports.update = (req, res) => {
  Conact.update(
    parseInt(req.params.id),
    {
      name: req.body.name,
      address: req.body.address,
      email: req.body.email,
      phoneNumbers: req.body.phoneNumbers,
    },
    (contact, message, status) => {
      if (!contact) {
        res.status(404).send();
      }

      res.send({
        status: status,
        message: message,
        data: {
          contact: contact,
        },
      });
    }
  );
};
