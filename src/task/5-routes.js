import { namespaceWrapper, app } from "@_koii/namespace-wrapper";

export async function routes() {
  app.get("/channelData/:round", async (req, res) => {
    const { round } = req.params;
    if (!round || isNaN(round)) {
      res.status(400).json({ error: "Invalid round number." });
      return;
    }

    try {
      const data = await namespaceWrapper.storeGet(`round_${round}_engagementData`);
      if (!data) {
        res.status(404).json({ error: "No data found for the given round." });
        return;
      }

      res.status(200).json({ round, data: JSON.parse(data) });
    } catch (error) {
      console.error("Error fetching channel data:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  });
}
