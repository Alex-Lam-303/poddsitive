import { fetchOdds } from "./fetchOdds.js";
import { preprocessData } from "./preprocessData.js";
import { processDataToSQL } from "./calculateEV.js";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { sports, markets } = req.body;

      // Step 1: Fetch data
      const oddsData = await fetchOdds(sports, markets);

      // Step 2: Pre-process the data
      const preprocessedData = preprocessData(oddsData);

      // Step 3: Analyze the data
      const processedData = await processDataToSQL(preprocessedData); // Ensure this is awaited

      // Send the processed data as a JSON response
      res.status(200).json(processedData);
    } catch (error) {
      console.error("Error processing odds:", error);
      res.status(500).json({ error: error.message }); // Send error response
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: "Method Not Allowed" }); // Send method not allowed response
  }
}
