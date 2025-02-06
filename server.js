const cors = require("cors");
const bodyParser = require("body-parser");
const scheduleRoutes = require("./routes/scheduleRoutes");
const newsRoutes = require("./routes/newsRoutes");
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const path = require('path');
const sequelize = require('./config/db');
const userRoutes = require('./routes/userRoutes');

require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));
app.use(flash());

// View Engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/user', userRoutes);

app.get('/', (req, res) => {
  res.render('index', { message: req.flash('success') });
});


//schedule
app.use("/schedule", scheduleRoutes);

//news
app.use("/news", newsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));