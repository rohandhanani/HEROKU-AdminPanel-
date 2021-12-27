const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();
require("./db/auth.conn");

const port = process.env.port;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const adminRouter = require("./routes/auth.router");
const studRouter = require("./routes/stud.router");
app.use("/auth", adminRouter);
app.use("/stud", studRouter);

app.listen(port, (req, res) => {
    console.log(`your ${port} is running...`);
});
