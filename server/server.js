const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const port = 3000;

mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("database connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
