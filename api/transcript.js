const fetch = require("node-fetch");

module.exports = async (req, res) => {
  const { videoId } = req.query;

  if (!videoId) {
    return res.status(400).json({ error: "Video ID is required" });
  }

  try {
    const response = await fetch(`https://www.youtube.com/watch?v=${videoId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch transcript");
    }
    const transcriptData = await response.json();
    res.status(200).json(transcriptData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
