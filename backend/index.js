const connectToMongo = require("./db");
connectToMongo();

const express = require("express");
const app = express();
const port = 3000;

// it requires in order to use req.body in respctive routes file
app.use(express.json())

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
