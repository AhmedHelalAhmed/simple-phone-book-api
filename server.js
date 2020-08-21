const express = require("express");
const app = express();
const config = require("config");
const port = config.get("port");
const appAuthKey = config.get("AppAuthKey");
const contactController = require("./app/Controllers/Contacts/ContactController");
const WelcomeController = require("./app/Controllers/WelcomeController");
const SearchingContactsController = require("./app/Controllers/Contacts/SearchingContactsController");
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
app.get("/contacts", contactController.index); // Get all contacts
app.post("/contacts", contactController.store); // Create Contact
app.get("/contacts/:id", contactController.show); // Get contact by id
app.delete("/contacts/:id", contactController.destroy); // Delete contact
app.put("/contacts/:id", contactController.update); // Update contact
app.get("/contacts-custom-search", SearchingContactsController.__invoke); // search by name, email phone

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
