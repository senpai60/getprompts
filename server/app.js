const express = require("express");
const { route } = require("./routes");
const app = express();
var cors = require("cors");
const db = require('./utils/db')

var whitelist = ["http://localhost:5173",undefined,null];

db()

var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

const indexRouter = require("./routes/index");

app.use("/promptsApi", indexRouter);

app.listen(3000);
