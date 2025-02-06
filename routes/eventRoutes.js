const express = require("express");
const router = express.Router();
const db = require("../db");

// 1. Tampilkan semua event
router.get("/", async (req, res) => {
    try {
        const events = await db.any("SELECT * FROM events ORDER BY date DESC");
        res.render("event", { events });
    } catch (err) {
        req.flash("error", "Gagal mengambil data event");
        res.redirect("/");
    }
});

// 2. Tampilkan form tambah event
router.get("/add", (req, res) => {
    res.render("input-event");
});

// 3. Tambah event baru
router.post("/add", async (req, res) => {
    const { title, date, location, description } = req.body;
    try {
        await db.none("INSERT INTO events (title, date, location, description) VALUES ($1, $2, $3, $4)", [title, date, location, description]);
        req.flash("success", "Event berhasil ditambahkan");
        res.redirect("/events");
    } catch (err) {
        req.flash("error", "Gagal menambahkan event");
        res.redirect("/events/add");
    }
});

// 4. Tampilkan halaman edit event
router.get("/edit/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const event = await db.one("SELECT * FROM events WHERE id = $1", [id]);
        res.render("edit-event", { event });
    } catch (err) {
        req.flash("error", "Event tidak ditemukan");
        res.redirect("/events");
    }
});

// 5. Update event
router.post("/edit/:id", async (req, res) => {
    const { id } = req.params;
    const { title, date, location, description } = req.body;
    try {
        await db.none("UPDATE events SET title=$1, date=$2, location=$3, description=$4 WHERE id=$5", [title, date, location, description, id]);
        req.flash("success", "Event berhasil diperbarui");
        res.redirect("/events");
    } catch (err) {
        req.flash("error", "Gagal memperbarui event");
        res.redirect(`/events/edit/${id}`);
    }
});

// 6. Hapus event
router.post("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await db.none("DELETE FROM events WHERE id=$1", [id]);
        req.flash("success", "Event berhasil dihapus");
        res.redirect("/events");
    } catch (err) {
        req.flash("error", "Gagal menghapus event");
        res.redirect("/events");
    }
});

module.exports = router;
