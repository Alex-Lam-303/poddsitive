import { fetchOdds } from "./pipeline/fetchOdds.js";
import { preprocessData } from "./pipeline/preprocessData.js";
import { processDataToSQL } from "./pipeline/calculateEV.js";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { api_key, sports, markets } = req.body;

      // Step 1: Fetch data
      const oddsData = await fetchOdds(api_key, sports, markets);

      // Step 2: Pre-process the data
      const preprocessedData = preprocessData(oddsData);

      // Step 3: Calculate the EV
      const processedData = await processDataToSQL(preprocessedData);

      res.status(200).json(processedData);
    } catch (error) {
      console.error("Error processing odds:", error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
