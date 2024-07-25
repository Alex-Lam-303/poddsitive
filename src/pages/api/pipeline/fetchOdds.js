import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
dotenv.config();

const REGIONS = "us";
const ODDS_FORMAT = "decimal";
const DATE_FORMAT = "iso";

export async function fetchOdds(api_key, sports, markets) {
  const MARKETS = markets.join(",");
  const API_KEY = api_key;
  try {
    const allData = [];

    for (const sport of sports) {
      const url = `https://api.the-odds-api.com/v4/sports/${sport}/odds`;
      const response = await axios.get(url, {
        params: {
          apiKey: API_KEY,
          regions: REGIONS,
          markets: MARKETS,
          oddsFormat: ODDS_FORMAT,
          dateFormat: DATE_FORMAT,
        },
      });

      if (response.status !== 200) {
        console.error(
          `Failed to get events for ${sport}: status_code ${response.status}, response body ${response.data}`
        );
      } else {
        allData.push(...response.data);
      }
    }
    return allData;
  } catch (error) {
    console.error("Error fetching odds:", error);
    throw error;
  }
  /* const filePath = path.join(process.cwd(), "src", "data", "rawData.json");
  const data = await fs.promises.readFile(filePath, "utf8");
  const jsonData = JSON.parse(data);
  return jsonData;
  */
}
