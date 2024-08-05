const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { getOdds, saveDemoData } = require("./odds");
const { transformOdds } = require("./odds/utils");

admin.initializeApp();

exports.demoOddsFetch = functions.pubsub
  .schedule("0 17 * * *")
  .timeZone("America/New_York")
  .onRun(async (context) => {
    const apiKey = functions.config().odds_api.apikey;
    const sports = ["baseball_mlb"];
    const markets = ["h2h", "spreads", "totals"];

    try {
      const data = await getOdds(apiKey, sports, markets);
      await saveDemoData(transformOdds(data));
      console.log("Successfully fetched and processed demo odds data!");
    } catch (error) {
      console.error("Error fetching odds:", error);
    }
  });
