import { namespaceWrapper, app } from "@_koii/namespace-wrapper";

export async function routes() {
  app.get("/channelData/:round", async (req, res) => {
    const { round } = req.params;
    const data = await namespaceWrapper.storeGet(`round_${round}_channelData`);
    res.status(200).json({ round, data: JSON.parse(data || "{}") });
  });
}
