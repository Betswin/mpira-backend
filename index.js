import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

// ====== CONFIG ======
const RAPID_API_HOST = "free-api-live-football-data.p.rapidapi.com";
const RAPID_API_KEY  = "aa9b398431mshb6718254ed39f93p11fa32jsn024b9d591518";

// ====== HEALTH CHECK ======
app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Mpira backend iko hewani 🚀"
  });
});

// ====== ENDPOINT: MECHI LIVE ======
app.get("/mechi", async (req, res) => {
  try {
    const response = await fetch(
      "https://free-api-live-football-data.p.rapidapi.com/football-live",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": RAPID_API_HOST,
          "x-rapidapi-key": RAPID_API_KEY
        }
      }
    );

    // Kama RapidAPI imerudisha error, bado rudisha 200 kwa Lovable
    if (!response.ok) {
      const text = await response.text();
      return res.status(200).json({
        error: true,
        message: "RapidAPI error",
        details: text
      });
    }

    const data = await response.json();

    // MUHIMU: 200 ALWAYS
    return res.status(200).json(data);

  } catch (error) {
    return res.status(200).json({
      error: true,
      message: "Server error",
      details: error.message,
      matches: []
    });
  }
});

// ====== START SERVER ======
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
