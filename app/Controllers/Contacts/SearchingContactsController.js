const Conact = require("../../../app/Models/Contact");

module.exports.__invoke = (req, res) => {
  let contacts = Conact.where([
    { name: "name", value: req.query.name },
    { name: "email", value: req.query.email },
    { name: "phoneNumbers", value: req.query.phone },
  ]);

  res.send({
    status: true,
    message: "Sucess",
    data: {
      contacts: contacts,
    },
  });
};
