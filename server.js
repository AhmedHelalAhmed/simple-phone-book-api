const express = require("express");
const app = express();

const config = require("config");

const port = config.get("port");
const appAuthKey = config.get("AppAuthKey");

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
