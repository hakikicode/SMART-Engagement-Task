import { namespaceWrapper } from "@_koii/namespace-wrapper";
import crypto from "crypto";

export async function audit(submission, roundNumber, submitterKey) {
  try {
    console.log(`AUDIT SUBMISSION FOR ROUND ${roundNumber} from ${submitterKey}`);

    const storedData = await namespaceWrapper.storeGet(
      `round_${roundNumber}_engagementData`
    );
    if (!storedData) {
      console.error(`No stored data found for round ${roundNumber}`);
      return false;
    }

    // Normalize data before comparison
    const normalizedData = JSON.stringify(JSON.parse(storedData), null, 2);
    const expectedHash = crypto.createHash("sha256").update(normalizedData).digest("hex");

    console.log(`Expected hash: ${expectedHash}, Submitted hash: ${submission}`);

    return expectedHash === submission;
  } catch (error) {
    console.error("AUDIT SUBMISSION ERROR:", error);
    return false;
  }
}
