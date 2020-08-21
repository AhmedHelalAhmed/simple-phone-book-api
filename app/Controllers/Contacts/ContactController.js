const Conact = require("../../../app/Models/Contact");

module.exports.index = (req, res) => {
  Conact.allAsync((data, status, message) => {
    res.send({
      data: data,
      status: status,
      message: message,
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
    (data, status, message) => {
      res.send({
        data: data,
        status: status,
        message: message,
      });
    }
  );
};

module.exports.show = (req, res) => {
  Conact.find(parseInt(req.params.id), (data, status, message) => {
    if (!data.contact) {
      res.status(404).send();
    } else {
      res.send({
        data: data,
        status: status,
        message: message,
      });
    }
  });
};

module.exports.destroy = (req, res) => {
  Conact.delete(parseInt(req.params.id), (data, status, message) => {
    if (!data.contact) {
      res.status(404).send();
    } else {
      res.send({
        data: data,
        status: status,
        message: message,
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
    (data, status, message) => {
      if (!data.contact) {
        res.status(404).send();
      } else {
        res.send({
          data: data,
          status: status,
          message: message,
        });
      }
    }
  );
};
