import "dotenv/config";

export const TASK_ID =
  process.env.TASK_ID || "2zVhiA4HqGg8PAZFJN3zBAvybpfNWcsWiXKH3cbpbqpt";
export const WEBPACKED_FILE_PATH =
  process.env.WEBPACKED_FILE_PATH || "../dist/main.js";

const envKeywords = process.env.TEST_KEYWORDS ?? "";

export const TEST_KEYWORDS = envKeywords
  ? envKeywords.split(",")
  : ["TEST", "SMART TESTING"];
