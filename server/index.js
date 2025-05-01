import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

// Работа с __dirname в ES-модулях
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const dbPath = path.resolve(__dirname, "../database/equipment.db");
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS equipment (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      location TEXT NOT NULL
    );
  `);
});

app.use(cors());
app.use(bodyParser.json());

app.get("/api/equipment", (req, res) => {
  db.all("SELECT * FROM equipment", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post("/api/equipment", (req, res) => {
  const { name, category, quantity, location } = req.body;
  db.run(
    `INSERT INTO equipment (name, category, quantity, location) VALUES (?, ?, ?, ?)`,
    [name, category, quantity, location],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
});

app.delete("/api/equipment/:id", (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM equipment WHERE id = ?`, [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ message: "Запись не найдена" });
    res.status(200).json({ message: "Запись удалена" });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
