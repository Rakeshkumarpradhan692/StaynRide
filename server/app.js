const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const userRoutes = require("./Routes/UserRoutes.js");
const adminRoutes = require("./Routes/AdminRoutes.js");
const publicRoutes = require("./Routes/PublicRoutes.js");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/public", publicRoutes);

app.get("/", (req, res) => {
  res.send("Server is up and running");
});

module.exports = app;
