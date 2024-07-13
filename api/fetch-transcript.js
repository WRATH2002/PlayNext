const YoutubeTranscript = require("youtube-transcript");

module.exports = async (req, res) => {
  if (req.method === "GET") {
    try {
      const { videoId } = req.body;

      if (!videoId) {
        return res.status(400).json({ error: "Missing videoId parameter" });
      }

      const transcriptData = await YoutubeTranscript.fetchTranscript(videoId);
      res.status(200).json(transcriptData);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch transcript" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};
