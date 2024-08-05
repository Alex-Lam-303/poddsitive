function gradeMap(odds) {
  if (odds > 5) return "S";
  if (odds > 4) return "A+";
  if (odds > 3) return "A";
  if (odds > 2) return "A-";
  if (odds > 1) return "B";
  if (odds > 0.5) return "C";
  if (odds > 0) return "D";
  if (odds == 0) return "F";
  return "";
}

const sportsMap = {
  baseball_mlb: "MLB",
  basketball_nba: "NBA",
  americanfootball_nfl: "NFL",
  icehockey_nhl: "NHL",
};

module.exports = {
  gradeMap,
  sportsMap,
};
