import { namespaceWrapper } from "@_koii/namespace-wrapper";
import crypto from "crypto";

export async function submission(roundNumber) {
  try {
    console.log(`MAKE SUBMISSION FOR ROUND ${roundNumber}`);

    // Retrieve stored data for the current round
    const data = await namespaceWrapper.storeGet(`round_${roundNumber}_channelData`);
    
    if (!data) {
      console.warn("No data found for submission.");
      return "{}";
    }

    // Generate a hash for the data (keccak256 or sha256)
    const hash = crypto.createHash("sha256").update(data).digest("hex");
    console.log(`Generated hash for submission: ${hash}`);

    // Return the hash (fits within the 512-byte limit)
    return hash;
  } catch (error) {
    console.error("MAKE SUBMISSION ERROR:", error.message);
  }
}
