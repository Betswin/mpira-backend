import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

// ===== HEALTH CHECK =====
app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Mpira backend iko live 🚀"
  });
});

// ===== MECHI LIVE ENDPOINT =====
app.get("/mechi", async (req, res) => {
  try {
    const response = await fetch(
      "https://free-api-live-football-data.p.rapidapi.com/football-get-live",
      {
        headers: {
          "x-rapidapi-host": process.env.RAPID_API_HOST,
          "x-rapidapi-key": process.env.RAPID_API_KEY
        }
      }
    );

    const data = await response.json();
    res.status(200).json(data);

  } catch (error) {
    res.status(200).json({
      error: true,
      message: "RapidAPI error",
      details: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
