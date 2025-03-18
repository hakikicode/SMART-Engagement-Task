import { namespaceWrapper } from "@_koii/namespace-wrapper";
import axios from "axios";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchChannelData(channel, retries = 3, delayMs = 1000) {
  try {
    console.log(`Fetching data for channel: ${channel}`);
    const response = await axios.get(
      `https://tg.i-c-a.su/json/${channel}?limit=50`
    );

    if (response.data && response.data.messages) {
      return response.data.messages.map((post) => ({
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

    let engagementData = {};
    for (const channel of channels) {
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
