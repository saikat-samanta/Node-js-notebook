const express = require("express");
const cors = require("cors");

const streamApi = require("./streaming-api");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/streaming", streamApi);

app.listen(3000, () => {
  console.log("listing port", 3000);
});
