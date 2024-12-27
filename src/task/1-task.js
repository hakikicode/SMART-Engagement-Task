import { namespaceWrapper } from "@_koii/namespace-wrapper";
import axios from "axios";

export async function task(roundNumber) {
  try {
    console.log(`EXECUTE TASK FOR ROUND ${roundNumber}`);

    const channels = ["breakingmash", "TelegramTips", "tapswapaiA"];
    const engagementData = {};

    for (const channel of channels) {
      try {
        console.log(`Fetching data for channel: ${channel}`);
        const response = await axios.get(`https://tg.i-c-a.su/json/${channel}?limit=50`);
        if (response.data && response.data.messages) {
          const posts = response.data.messages;
          engagementData[channel] = posts.map((post) => ({
            id: post.id,
            date: post.date,
            likes: post.reactions?.like || 0,
            comments: post.replies?.count || 0,
            views: post.views || 0,
          }));
        }
      } catch (error) {
        console.error(`Error fetching data for channel ${channel}:`, error.message);
        // Skip restricted or invalid channels
        continue;
      }
    }

    if (Object.keys(engagementData).length === 0) {
      console.error("No valid engagement data found.");
      return;
    }

    await namespaceWrapper.storeSet(`round_${roundNumber}_engagementData`, JSON.stringify(engagementData));
    console.log(`Stored engagement data for round ${roundNumber}`);
  } catch (error) {
    console.error("TASK EXECUTION ERROR:", error);
  }
}
