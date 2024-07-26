const { DateTime } = require("luxon"); // For date handling

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
      market: "Totals",
      team: outcome.name,
      point: outcome.point,
      line: `${teamMap[oddsInfo.sport_key][oddsInfo.home_team]} vs ${
        teamMap[oddsInfo.sport_key][oddsInfo.away_team]
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
  try {
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
      throw new Error("Unexpected data format");
    }
  } catch (error) {
    console.error("Error processing data:", error);
    throw error;
  }
  return processedData;
}

module.exports = { isoToDt, formatData, preprocessData };

const teamMap = {
  baseball_mlb: {
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
  },
  basketball_nba: {
    "Atlanta Hawks": "ATL",
    "Boston Celtics": "BOS",
    "Charlotte Hornets": "CHA",
    "Chicago Bulls": "CHI",
    "Cleveland Cavaliers": "CLE",
    "Dallas Mavericks": "DAL",
    "Denver Nuggets": "DEN",
    "Detroit Pistons": "DET",
    "Golden State Warriors": "GSW",
    "Houston Rockets": "HOU",
    "Indiana Pacers": "IND",
    "Los Angeles Clippers": "LAC",
    "Los Angeles Lakers": "LAL",
    "Memphis Grizzlies": "MEM",
    "Miami Heat": "MIA",
    "Milwaukee Bucks": "MIL",
    "Minnesota Timberwolves": "MIN",
    "New Orleans Pelicans": "NOP",
    "New York Knicks": "NYK",
    "Brooklyn Nets": "BKN",
    "Oklahoma City Thunder": "OKC",
    "Orlando Magic": "ORL",
    "Philadelphia 76ers": "PHI",
    "Phoenix Suns": "PHO",
    "Portland Trail Blazers": "POR",
    "Sacramento Kings": "SAC",
    "San Antonio Spurs": "SAS",
    "Toronto Raptors": "TOR",
    "Utah Jazz": "UTH",
    "Washington Wizards": "WAS",
  },
  americanfootball_nfl: {
    "Arizona Cardinals": "ARI",
    "Atlanta Falcons": "ATL",
    "Baltimore Ravens": "BAL",
    "Buffalo Bills": "BUF",
    "Carolina Panthers": "CAR",
    "Chicago Bears": "CHI",
    "Cincinnati Bengals": "CIN",
    "Cleveland Browns": "CLE",
    "Dallas Cowboys": "DAL",
    "Denver Broncos": "DEN",
    "Detroit Lions": "DET",
    "Green Bay Packers": "GB",
    "Houston Texans": "HOU",
    "Indianapolis Colts": "IND",
    "Jacksonville Jaguars": "JAX",
    "Kansas City Chiefs": "KC",
    "Miami Dolphins": "MIA",
    "Minnesota Vikings": "MIN",
    "New England Patriots": "NE",
    "New Orleans Saints": "NO",
    "New York Giants": "NYG",
    "New York Jets": "NYJ",
    "Las Vegas Raiders": "LV",
    "Philadelphia Eagles": "PHI",
    "Pittsburgh Steelers": "PIT",
    "Los Angeles Chargers": "LAC",
    "San Francisco 49ers": "SF",
    "Seattle Seahawks": "SEA",
    "Los Angeles Rams": "LAR",
    "Tampa Bay Buccaneers": "TB",
    "Tennessee Titans": "TEN",
    "Washington Commanders": "WAS",
  },
  icehockey_nhl: {
    "Anaheim Ducks": "ANA",
    "Boston Bruins": "BOS",
    "Buffalo Sabres": "BUF",
    "Carolina Hurricanes": "CAR",
    "Columbus Blue Jackets": "CBJ",
    "Calgary Flames": "CGY",
    "Chicago Blackhawks": "CHI",
    "Colorado Avalanche": "COL",
    "Dallas Stars": "DAL",
    "Detroit Red Wings": "DET",
    "Edmonton Oilers": "EDM",
    "Florida Panthers": "FLA",
    "Los Angeles Kings": "LAK",
    "Minnesota Wild": "MIN",
    "Montreal Canadiens": "MTL",
    "New Jersey Devils": "NJD",
    "Nashville Predators": "NSH",
    "New York Islanders": "NYI",
    "New York Rangers": "NYR",
    "Ottawa Senators": "OTT",
    "Philadelphia Flyers": "PHI",
    "Pittsburgh Penguins": "PIT",
    "Seattle Kraken": "SEA",
    "San Jose Sharks": "SJS",
    "St Louis Blues": "STL",
    "Tampa Bay Lightning": "TBL",
    "Toronto Maple Leafs": "TOR",
    "Utah Hockey Club": "UTA",
    "Vancouver Canucks": "VAN",
    "Vegas Golden Knights": "VGK",
    "Winnipeg Jets": "WPG",
    "Washington Capitals": "WSH",
  },
};
