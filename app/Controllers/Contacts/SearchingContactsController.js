const Conact = require("../../../app/Models/Contact");

module.exports.__invoke = (req, res) => {
  Conact.where(
    [
      { name: "name", value: req.query.name },
      { name: "email", value: req.query.email },
      { name: "phoneNumbers", value: req.query.phone },
    ],
    (contacts, status, message) => {
      res.send({
        status: status,
        message: message,
        data: {
          contacts: contacts,
        },
      });
    }
  );
};
