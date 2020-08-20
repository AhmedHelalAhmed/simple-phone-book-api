const express = require("express");
const app = express();
const config = require("config");
const port = config.get("port");
const appAuthKey = config.get("AppAuthKey");
const contactsController = require("./app/Controllers/PhoneBook/ContactsController");
const WelcomeController = require("./app/Controllers/WelcomeController");

app.use((req, res, next) => {
  if (req.headers["appauthkey"] !== appAuthKey) {
    res.status(401).send();
  } else {
    next();
  }
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", WelcomeController.__invoke); // Welcome endpoint
app.get("/contacts", contactsController.index); // Get all contacts
app.post("/contacts", contactsController.store); // Create Contact
app.get("/contacts/:id", contactsController.show); // Get contact by id
/*
TODO
Delete contact
Update contact
Implement Custom endpoint for search by name, email phone
*/
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
