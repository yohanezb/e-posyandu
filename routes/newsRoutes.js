const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Get semua berita
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM news ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Tambah berita baru
router.post("/", async (req, res) => {
  const { title, content, image_url } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO news (title, content, image_url) VALUES ($1, $2, $3) RETURNING *",
      [title, content, image_url]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Edit berita
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content, image_url } = req.body;
  try {
    const result = await pool.query(
      "UPDATE news SET title = $1, content = $2, image_url = $3 WHERE id = $4 RETURNING *",
      [title, content, image_url, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Hapus berita
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM news WHERE id = $1", [id]);
    res.json({ message: "Berita berhasil dihapus" });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
