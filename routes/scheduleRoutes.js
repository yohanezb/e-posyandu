const express = require("express");
const router = express.Router();
const pool = require("../db");

// Get semua jadwal
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM schedule ORDER BY tanggal ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Tambah jadwal baru
router.post("/", async (req, res) => {
  const { tanggal, waktu, lokasi, kegiatan } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO schedule (tanggal, waktu, lokasi, kegiatan) VALUES ($1, $2, $3, $4) RETURNING *",
      [tanggal, waktu, lokasi, kegiatan]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Edit jadwal
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { tanggal, waktu, lokasi, kegiatan } = req.body;
  try {
    const result = await pool.query(
      "UPDATE schedule SET tanggal = $1, waktu = $2, lokasi = $3, kegiatan = $4 WHERE id = $5 RETURNING *",
      [tanggal, waktu, lokasi, kegiatan, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Hapus jadwal
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM schedule WHERE id = $1", [id]);
    res.json({ message: "Jadwal berhasil dihapus" });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
