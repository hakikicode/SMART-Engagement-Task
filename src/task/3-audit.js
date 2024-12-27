import { namespaceWrapper } from "@_koii/namespace-wrapper";
import crypto from "crypto";

export async function audit(submission, roundNumber, submitterKey) {
  console.log(`AUDIT SUBMISSION FOR ROUND ${roundNumber} from ${submitterKey}`);
  try {
    // Retrieve stored data for the round
    const storedData = await namespaceWrapper.storeGet(`round_${roundNumber}_channelData`);
    
    if (!storedData) {
      console.warn("No stored data found for audit.");
      return false;
    }

    // Generate a hash of the stored data
    const expectedHash = crypto.createHash("sha256").update(storedData).digest("hex");
    console.log(`Expected hash: ${expectedHash}, Submitted hash: ${submission}`);

    // Compare the hashes
    return submission === expectedHash;
  } catch (error) {
    console.error("AUDIT ERROR:", error.message);
    return false;
  }
}
