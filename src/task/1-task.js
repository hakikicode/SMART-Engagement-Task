import { namespaceWrapper } from "@_koii/namespace-wrapper";
import axios from "axios";

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

const http = axios.create({
  timeout: 10_000,
  headers: {
    "User-Agent": "SMART-Engagement-Task/1.0 (+koii)",
    "Accept": "application/json",
  },
});

async function fetchChannelData(channel, retries = 3, delayMs = 1000) {
  try {
    console.log(`Fetching data for channel: ${channel}`);
    const { data } = await http.get(`https://tg.i-c-a.su/json/${channel}?limit=50`);

    if (data && data.messages) {
      return data.messages.map((post) => ({
        id: post.id,
        date: post.date,
        likes: post.reactions?.like || 0,
        comments: post.replies?.count || 0,
        views: post.views || 0,
      }));
    }
  } catch (error) {
    console.error(`Error fetching data for ${channel}: ${error.message}`);
    if (retries > 0) {
      console.log(`Retrying ${channel} in ${delayMs}ms...`);
      await delay(delayMs);
      return fetchChannelData(channel, retries - 1, delayMs * 2);
    }
  }
  return [];
}

export async function task(roundNumber) {
  try {
    console.log(`EXECUTE TASK FOR ROUND ${roundNumber}`);
    const channels = [
      "breakingmash",
      "TelegramTips",
      "tapswapaiA",
      "battle_games_com",
      "OKZOO_ANN",
      "CatizenAnn",
      "gameechannel",
    ];

    const engagementData = {};
    for (const channel of channels) {
      // small jitter (250–1000ms) between requests to reduce 420/403s
      await delay(250 + Math.random() * 750);
      engagementData[channel] = await fetchChannelData(channel);
    }

    if (Object.keys(engagementData).length === 0) {
      console.error("No valid engagement data found.");
      return;
    }

    await namespaceWrapper.storeSet(
      `round_${roundNumber}_engagementData`,
      JSON.stringify(engagementData)
    );
    console.log(`Stored engagement data for round ${roundNumber}`);
  } catch (error) {
    console.error("TASK EXECUTION ERROR:", error);
  }
}
