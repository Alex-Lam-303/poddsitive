import { gradeMap } from "../constants/gradeMap";
import { sportsMap } from "../constants/sportsMap";

export const convertDecimalToAmericanOdds = (decimalOdds) => {
  decimalOdds = parseFloat(decimalOdds);
  if (decimalOdds >= 2.0) {
    return "+" + String(Math.round((decimalOdds - 1) * 100));
  } else {
    return String(Math.round(-100 / (decimalOdds - 1)));
  }
};

export const getOdds = async (sports, markets) => {
  console.log("SPORTS", sports);
  console.log("MARKETS", markets);
  const requestBody = JSON.stringify({ sports, markets });
  console.log("Request Body:", requestBody);
  try {
    const response = await fetch("http://127.0.0.1:5000/get-odds", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sports, markets }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching odds:", error);
    throw error;
  }
};

export const transformOdds = (oddsData) => {
  return oddsData.map((odds) => {
    const sport = sportsMap[odds[0]];
    const last_updated = new Date(odds[1]).toLocaleString();
    const commence_datetime = new Date(odds[2]).toLocaleString();
    const home_team = odds[3];
    const away_team = odds[4];
    const market = odds[5];
    const line = odds[6];
    const probability = odds[7];
    const implied_odds = Math.round((1 / probability) * 100 * 100) / 100;
    const positive_ev = odds[8];
    const grade = gradeMap(odds[8]);
    const fanduel = odds[9];
    const draftkings = odds[10];
    const betmgm = odds[11];
    const caesars = odds[12];
    const betrivers = odds[13];
    const mybookie_ag = odds[14];
    const bovada = odds[15];
    const betus = odds[16];
    const lowvig_ag = odds[17];
    const betonline_ag = odds[18];

    const maxOdds = Math.max(
      fanduel,
      draftkings,
      betmgm,
      caesars,
      betrivers,
      mybookie_ag,
      bovada,
      betus,
      lowvig_ag,
      betonline_ag
    );
    const pickNames = [];
    if (odds[9] === maxOdds) pickNames.push("FanDuel");
    if (odds[10] === maxOdds) pickNames.push("DraftKings");
    if (odds[11] === maxOdds) pickNames.push("BetMGM");
    if (odds[12] === maxOdds) pickNames.push("Caesars");
    if (odds[13] === maxOdds) pickNames.push("BetRivers");
    if (odds[14] === maxOdds) pickNames.push("MyBookie.ag");
    if (odds[15] === maxOdds) pickNames.push("Bovada");
    if (odds[16] === maxOdds) pickNames.push("BetUS");
    if (odds[17] === maxOdds) pickNames.push("LowVig.ag");
    if (odds[18] === maxOdds) pickNames.push("BetOnline.ag");

    return {
      sport,
      last_updated,
      commence_datetime,
      home_team,
      away_team,
      market,
      line,
      probability,
      implied_odds,
      positive_ev,
      grade,
      fanduel,
      draftkings,
      betmgm,
      caesars,
      betrivers,
      mybookie_ag,
      bovada,
      betus,
      lowvig_ag,
      betonline_ag,
      pick: pickNames,
    };
  });
};
