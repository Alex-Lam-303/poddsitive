import { gradeMap } from "../constants/gradeMap";
import { sportsMap } from "../constants/sportsMap";
import { DateTime } from "luxon";

export const convertDecimalToAmericanOdds = (decimalOdds) => {
  decimalOdds = parseFloat(decimalOdds);
  if (decimalOdds >= 2.0) {
    return "+" + String(Math.round((decimalOdds - 1) * 100));
  } else {
    return String(Math.round(-100 / (decimalOdds - 1)));
  }
};

export const transformOdds = (oddsData) => {
  return oddsData.map((odds) => {
    const sport = sportsMap[odds.sport_key];
    const last_updated = odds.last_update;
    const commence_datetime = odds.commence_time;
    const home_team = odds.home_team;
    const away_team = odds.away_team;
    const market = odds.market;
    const line = odds.line;
    const probability = odds.Implied_Odds;
    const implied_odds = Math.round((1 / probability) * 100 * 100) / 100;
    const positive_ev = odds.Positive_EV;
    const grade = gradeMap(odds.grade);
    const fanduel = odds.FanDuel;
    const draftkings = odds.DraftKings;
    const betmgm = odds.BetMGM;
    const caesars = odds.Caesars;
    const betrivers = odds.BetRivers;
    const mybookie_ag = odds.MyBookie_ag;
    const bovada = odds.Bovada;
    const betus = odds.BetUS;
    const lowvig_ag = odds.LowVig_ag;
    const betonline_ag = odds.BetOnline_ag;

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
    if (odds.FanDuel === maxOdds) pickNames.push("FanDuel");
    if (odds.DraftKings === maxOdds) pickNames.push("DraftKings");
    if (odds.BetMGM === maxOdds) pickNames.push("BetMGM");
    if (odds.Caesars === maxOdds) pickNames.push("Caesars");
    if (odds.BetRivers === maxOdds) pickNames.push("BetRivers");
    if (odds.MyBookie_ag === maxOdds) pickNames.push("MyBookie.ag");
    if (odds.Bovada === maxOdds) pickNames.push("Bovada");
    if (odds.BetUS === maxOdds) pickNames.push("BetUS");
    if (odds.LowVig_ag === maxOdds) pickNames.push("LowVig.ag");
    if (odds.BetOnline_ag === maxOdds) pickNames.push("BetOnline.ag");

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
