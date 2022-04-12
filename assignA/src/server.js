const express = require("express");
const dotenv = require("dotenv");

// env config
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// connect to db
require("./config/mongoose");

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome.. Server is runing..");
})

// routes
const userRoutes = require("./routes/user");
app.use("/users", userRoutes);

app.listen(port, () => {
    console.log("Server running on port", port);
})