const express = require("express");
const CONFIG = require("./config");
const routes = require("./routes");
const mongo = require("./mongo");
require("./redis");

const app = express();
app.use(express.json());

// all routes
app.use(`/api/${CONFIG.DEFAULT_API_VERSION}`, routes);

const start = async () => {
  app.listen(CONFIG.PORT, async () => {
    console.log(`Server is listing to port ${CONFIG.PORT}`);
    await mongo.mongo.connectToDB();
  });
};

start();
