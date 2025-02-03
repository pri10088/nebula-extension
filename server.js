import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // Use import instead of require

const app = express();
app.use(cors());

app.get("/api/quotes", async (req, res) => {
    try {
        const response = await fetch("https://zenquotes.io/api/quotes/");
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch quote" });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
