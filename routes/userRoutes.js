const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
  const { nama, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      req.flash('error', 'Email sudah terdaftar');
      return res.redirect('/');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ nama, email, password: hashedPassword, role });

    req.flash('success', 'Registrasi berhasil, silakan login');
    res.redirect('/');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Terjadi kesalahan');
    res.redirect('/');
  }
});

// Login User
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      req.flash('error', 'Email tidak ditemukan');
      return res.redirect('/');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      req.flash('error', 'Password salah');
      return res.redirect('/');
    }

    req.session.user = { id: user.id, role: user.role };
    req.flash('success', 'Login berhasil');
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Terjadi kesalahan');
    res.redirect('/');
  }
});

// Logout User
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
  const { nama, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      req.flash('error', 'Email sudah terdaftar');
      return res.redirect('/');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ nama, email, password: hashedPassword, role });

    req.flash('success', 'Registrasi berhasil, silakan login');
    res.redirect('/');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Terjadi kesalahan');
    res.redirect('/');
  }
});

// Login User
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      req.flash('error', 'Email tidak ditemukan');
      return res.redirect('/');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      req.flash('error', 'Password salah');
      return res.redirect('/');
    }

    req.session.user = { id: user.id, role: user.role };
    req.flash('success', 'Login berhasil');
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Terjadi kesalahan');
    res.redirect('/');
  }
});

// Logout User
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
