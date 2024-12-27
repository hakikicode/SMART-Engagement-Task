import { namespaceWrapper } from "@_koii/namespace-wrapper";
import crypto from "crypto";

export async function audit(submission, roundNumber, submitterKey) {
  try {
    console.log(`AUDIT SUBMISSION FOR ROUND ${roundNumber} from ${submitterKey}`);

    // Retrieve stored engagement data for validation
    const storedData = await namespaceWrapper.storeGet(`round_${roundNumber}_engagementData`);
    if (!storedData) {
      console.error(`No stored data found for round ${roundNumber}`);
      return false;
    }

    // Generate hash of stored data
    const expectedHash = crypto.createHash("sha256").update(storedData).digest("hex");
    console.log(`Expected hash: ${expectedHash}, Submitted hash: ${submission}`);

    // Compare hashes
    return expectedHash === submission;
  } catch (error) {
    console.error("AUDIT SUBMISSION ERROR:", error);
    return false;
  }
}
