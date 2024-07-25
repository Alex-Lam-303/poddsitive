const { DateTime } = require("luxon"); // For date handling

const teamMap = {
  "Arizona Diamondbacks": "AZ",
  "Atlanta Braves": "ATL",
  "Baltimore Orioles": "BAL",
  "Boston Red Sox": "BOS",
  "Chicago Cubs": "CHC",
  "Chicago White Sox": "CWS",
  "Cincinnati Reds": "CIN",
  "Cleveland Guardians": "CLE",
  "Colorado Rockies": "COL",
  "Detroit Tigers": "DET",
  "Houston Astros": "HOU",
  "Kansas City Royals": "KC",
  "Los Angeles Angels": "LAA",
  "Los Angeles Dodgers": "LAD",
  "Miami Marlins": "MIA",
  "Milwaukee Brewers": "MIL",
  "Minnesota Twins": "MIN",
  "New York Mets": "NYM",
  "New York Yankees": "NYY",
  "Oakland Athletics": "OAK",
  "Philadelphia Phillies": "PHI",
  "Pittsburgh Pirates": "PIT",
  "San Diego Padres": "SD",
  "San Francisco Giants": "SF",
  "Seattle Mariners": "SEA",
  "St. Louis Cardinals": "STL",
  "Tampa Bay Rays": "TB",
  "Texas Rangers": "TEX",
  "Toronto Blue Jays": "TOR",
  "Washington Nationals": "WSH",
};

function isoToDt(isoStr) {
  return DateTime.fromISO(isoStr.replace("Z", "+00:00")).toJSDate();
}

function formatData(oddsInfo, line) {
  if (line.key === "h2h") {
    return line.outcomes.map((outcome) => ({
      game_id: oddsInfo.game_id,
      sport_key: oddsInfo.sport_key,
      commence_time: oddsInfo.commence_time,
      sportsbook: oddsInfo.sportsbook,
      market: "Moneyline",
      team: outcome.name,
      price: outcome.price,
      line: `${outcome.name} Moneyline`,
      home_team: oddsInfo.home_team,
      away_team: oddsInfo.away_team,
      last_update: line.last_update,
    }));
  } else if (line.key === "spreads") {
    return line.outcomes.map((outcome) => ({
      game_id: oddsInfo.game_id,
      sport_key: oddsInfo.sport_key,
      commence_time: oddsInfo.commence_time,
      sportsbook: oddsInfo.sportsbook,
      market: "Spread",
      team: outcome.name,
      point: outcome.point,
      line: `${outcome.name} ${
        outcome.point < 0 ? outcome.point : "+" + outcome.point
      }`,
      price: outcome.price,
      home_team: oddsInfo.home_team,
      away_team: oddsInfo.away_team,
      last_update: line.last_update,
    }));
  } else if (line.key === "totals") {
    return line.outcomes.map((outcome) => ({
      game_id: oddsInfo.game_id,
      sport_key: oddsInfo.sport_key,
      commence_time: oddsInfo.commence_time,
      sportsbook: oddsInfo.sportsbook,
      market: "Total",
      team: outcome.name,
      point: outcome.point,
      line: `${teamMap[oddsInfo.home_team]} vs ${
        teamMap[oddsInfo.away_team]
      }\n${outcome.name} ${outcome.point}`,
      price: outcome.price,
      home_team: oddsInfo.home_team,
      away_team: oddsInfo.away_team,
      last_update: line.last_update,
    }));
  }
}

function preprocessData(data) {
  const processedData = [];
  if (Array.isArray(data) && data.length > 0 && typeof data[0] === "object") {
    data.forEach((event) => {
      const eventId = event.id;
      const sportKey = event.sport_key;
      const homeTeam = event.home_team;
      const awayTeam = event.away_team;
      const commenceTime = event.commence_time;

      event.bookmakers.forEach((bookmaker) => {
        const oddsInfo = {
          game_id: eventId,
          sport_key: sportKey,
          sportsbook: bookmaker.title,
          home_team: homeTeam,
          away_team: awayTeam,
          commence_time: commenceTime,
        };

        bookmaker.markets.forEach((market) => {
          const formattedOdds = formatData(oddsInfo, market);
          processedData.push(...formattedOdds);
        });
      });
    });
  } else {
    console.log("Unexpected data format");
  }
  return processedData;
}

module.exports = { isoToDt, formatData, preprocessData };
