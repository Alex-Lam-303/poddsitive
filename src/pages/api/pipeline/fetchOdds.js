import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
dotenv.config();

const REGIONS = "us";
const ODDS_FORMAT = "decimal";
const DATE_FORMAT = "iso";
const API_KEY = process.env.ODDS_API_KEY;

export async function fetchOdds(sports, markets) {
  const MARKETS = markets.join(",");
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
    console.error(error);
    return { error: error.message };
  }
  /*
  const filePath = path.join(process.cwd(), "src", "data", "rawData.json"); // Adjust the path as necessary
  const data = await fs.promises.readFile(filePath, "utf8"); // Use fs.promises to read the file
  const jsonData = JSON.parse(data);
  return jsonData;
  */
}
