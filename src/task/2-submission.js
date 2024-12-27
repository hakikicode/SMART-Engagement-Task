import { namespaceWrapper } from "@_koii/namespace-wrapper";
import crypto from "crypto";

export async function submission(roundNumber) {
  try {
    console.log(`MAKE SUBMISSION FOR ROUND ${roundNumber}`);

    const engagementData = await namespaceWrapper.storeGet(`round_${roundNumber}_engagementData`);
    if (!engagementData) {
      console.error(`No engagement data found for round ${roundNumber}`);
      return null;
    }

    // Generate a hash for submission
    const hash = crypto.createHash("sha256").update(engagementData).digest("hex");
    console.log(`Generated hash for submission: ${hash}`);
    return hash;
  } catch (error) {
    console.error("MAKE SUBMISSION ERROR:", error);
    return null;
  }
}
