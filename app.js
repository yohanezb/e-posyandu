require("dotenv").config();
require("./libs/hbs-helper");
const { Sequelize, QueryTypes, Model } = require("sequelize");
const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const config = require("./config/config");
const environment = process.env.NODE_ENV;
const sequelize = new Sequelize(config[environment]);
const session = require("express-session");
const flash = require("express-flash");
const bcrypt = require("bcrypt");

app.set("view engine", "hbs");


//publication
app.use("/assets", express.static(path.join(__dirname, "./assets")));
app.use("/views", express.static("views"));
app.use(express.urlencoded({ extended: true }));




app.use(
  session({
    name: "my-session",
    secret: "apaajaboleh",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.user = req.session.user || null;
  next();
});


// routing page
project-detail/:index", projectDetail);


app.get("/login", redirectIfLogin, login);
app.get("/login", login);
app.get("/register", redirectIfLogin, register);
app.get("/register", register);
app.post("/login", redirectIfLogin, loginPost);
app.post("/register", registerPost);
app.post("/register", redirectIfLogin, loginPost);
app.post("/login", loginPost);
app.post("/logout", logoutPost);

//login