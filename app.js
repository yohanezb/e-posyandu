const express = require("express");
const app = express();
const flash = require("connect-flash");
const session = require("express-session");
const bodyParser = require("body-parser");
const eventRoutes = require("./routes/eventRoutes");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
    })
);
app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.set("view engine", "hbs");

app.use("/events", eventRoutes);

app.listen(3000, () => {
    console.log("Server berjalan di http://localhost:3000");
});
