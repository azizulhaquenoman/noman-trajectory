import express from "express";
import cors from "cors";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_FILE = join(__dirname, "..", "public", "data", "portfolioData.json");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json({ limit: "5mb" }));

// GET portfolio data
app.get("/api/portfolio", (req, res) => {
  try {
    if (!existsSync(DATA_FILE)) {
      return res.status(404).json({ error: "Data file not found" });
    }
    const raw = readFileSync(DATA_FILE, "utf-8");
    const data = JSON.parse(raw);
    res.json(data);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to read data", details: err.message });
  }
});

// POST (save) portfolio data
app.post("/api/portfolio", (req, res) => {
  try {
    const data = req.body;
    if (!data || typeof data !== "object") {
      return res.status(400).json({ error: "Invalid data" });
    }

    // Ensure directory exists
    const dir = dirname(DATA_FILE);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }

    writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
    res.json({ success: true, message: "Data saved successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to save data", details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`\n  Portfolio Admin Server running at:`);
  console.log(`  -> http://localhost:${PORT}`);
  console.log(`  -> API: http://localhost:${PORT}/api/portfolio\n`);
});
