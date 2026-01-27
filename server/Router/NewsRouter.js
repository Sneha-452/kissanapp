const express = require("express");
const axios = require("axios");
const router = express.Router();

const NEWSDATA_API_KEY = process.env.NEWSDATA_API_KEY;

// keywords for allowed news
const farmerKeywords = [
  "farmer", "farmers", "farming", "agriculture", "crop", "crops",
  "kisan", "mandi", "irrigation", "fertilizer", "harvest",
  "monsoon", "rain", "weather", "soil", "wheat", "rice", "paddy",
  "msp", "fasal", "seed"
];

// keywords to remove irrelevant news
const bannedKeywords = [
  "movie", "film", "bollywood", "cricket", "match", "police", "crime",
  "arrested", "politics", "election", "ai", "technology",
  "bitcoin", "stock", "business", "celebrity"
];

function isFarmerNews(article) {
  const text = `${article.title} ${article.description}`.toLowerCase();

  
  if (bannedKeywords.some(b => text.includes(b))) return false;

  
  const matches = farmerKeywords.filter(k => text.includes(k)).length;


  return matches >= 2;
}

router.get("/farmer", async (req, res) => {
  try {
    const resp = await axios.get("https://newsdata.io/api/1/news", {
      params: {
        apikey: NEWSDATA_API_KEY,
        q: "farmer OR crop OR kisan OR agriculture OR farming OR mandi",
        country: "in",
        language: "en,hi",
        category: "top"
      }
    });

    let articles = resp.data.results || [];

    
    let filtered = articles.filter(isFarmerNews);

    
    if (filtered.length < 4) {
      filtered = articles.filter(a =>
        `${a.title} ${a.description}`.toLowerCase().includes("farmer")
      );
    }

  
    filtered = filtered.slice(0, 6).map(n => ({
      title: n.title,
      description: n.description,
      link: n.link,
      pubDate: n.pubDate,
      source: n.source_id
    }));

    res.json({ success: true, data: filtered });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({
      success: false,
      message: "Farmer news fetch karne me problem aa gayi"
    });
  }
});

module.exports = router;


