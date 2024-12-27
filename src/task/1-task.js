import { namespaceWrapper } from "@_koii/namespace-wrapper";
import axios from "axios";

const CHANNEL_NAME = "TelegramTips"; // Replace with your desired public channel
const TG_JSON_API = `https://tg.i-c-a.su/json/${CHANNEL_NAME}`;

export async function task(roundNumber) {
  try {
    console.log(`EXECUTE TASK FOR ROUND ${roundNumber}`);

    // Fetch the latest 50 posts from the channel
    const response = await axios.get(`${TG_JSON_API}?limit=50`);
    const channelData = response.data;

    // Store the channel data in namespace storage
    await namespaceWrapper.storeSet(`round_${roundNumber}_channelData`, JSON.stringify(channelData));
    console.log(`Stored data for round ${roundNumber}`);
  } catch (error) {
    console.error("EXECUTE TASK ERROR:", error.message);
  }
}
