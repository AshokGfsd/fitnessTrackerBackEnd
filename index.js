const mongoose = require("mongoose");
const app = require("./app");
const { MONGODB_URI, PORT } = require("./utils/config");

console.log("connecting to mongo db....");

mongoose.connect(MONGODB_URI).then(() => {
  console.log("connected successfully!");
  app.listen(4446, () => {
    console.log(`The server is running on http://127.0.0.1:${PORT}`);
  });
});
