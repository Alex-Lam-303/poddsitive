const sqlite3 = require("sqlite3").verbose();

function processDataToSQL(data) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(":memory:"); // Use in-memory database

    db.serialize(() => {
      // Create the events table
      db.run(`
        CREATE TABLE IF NOT EXISTS events (
          game_id TEXT,
          last_update DATETIME,
          sport_key TEXT,
          commence_time TEXT,
          sportsbook TEXT,
          market TEXT,
          team TEXT,
          price REAL,
          line TEXT,
          home_team TEXT,
          away_team TEXT
        )
      `);

      // Insert processed data into the events table
      const stmt = db.prepare(`
        INSERT INTO events (
          game_id, last_update, sport_key, commence_time, home_team, away_team, market, team, price, line, sportsbook
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      data.forEach((odds) => {
        stmt.run(
          odds.game_id,
          odds.last_update,
          odds.sport_key,
          odds.commence_time,
          odds.home_team,
          odds.away_team,
          odds.market,
          odds.team,
          odds.price,
          odds.line,
          odds.sportsbook
        );
      });

      stmt.finalize();

      // Calculate expected value
      db.all(
        `
        WITH market_data AS (
          SELECT
            game_id,
            last_update,
            sport_key,
            commence_time,
            home_team,
            away_team,
            market,
            team,
            price,
            line,
            sportsbook,
            1.0 / price AS implied_odds
          FROM
            events
        ),
        ev_calculation AS (
          SELECT
            game_id,
            home_team,
            away_team,
            commence_time, 
            market,
            line,
            team,
            AVG(implied_odds) AS avg_implied_odds,
            (MAX(price) - 1 / AVG(implied_odds)) AS max_ev
          FROM
            market_data
          GROUP BY
            game_id, home_team, away_team, commence_time, market, line, team
        )
        SELECT
          md.sport_key,
          MAX(md.last_update) AS last_update,
          md.commence_time,
          md.home_team,
          md.away_team,
          md.market,
          md.line,
          ROUND(ev.avg_implied_odds * 100, 2) AS "Implied_Odds",
          ROUND(ev.max_ev, 2) AS "Positive_EV",
          MAX(CASE WHEN md.sportsbook = 'FanDuel' THEN md.price ELSE NULL END) AS FanDuel,
          MAX(CASE WHEN md.sportsbook = 'DraftKings' THEN md.price ELSE NULL END) AS DraftKings,
          MAX(CASE WHEN md.sportsbook = 'BetMGM' THEN md.price ELSE NULL END) AS BetMGM,
          MAX(CASE WHEN md.sportsbook = 'Caesars' THEN md.price ELSE NULL END) AS Caesars,
          MAX(CASE WHEN md.sportsbook = 'BetRivers' THEN md.price ELSE NULL END) AS BetRivers,
          MAX(CASE WHEN md.sportsbook = 'MyBookie.ag' THEN md.price ELSE NULL END) AS MyBookie_ag,
          MAX(CASE WHEN md.sportsbook = 'Bovada' THEN md.price ELSE NULL END) AS Bovada,
          MAX(CASE WHEN md.sportsbook = 'BetUS' THEN md.price ELSE NULL END) AS BetUS,
          MAX(CASE WHEN md.sportsbook = 'LowVig.ag' THEN md.price ELSE NULL END) AS LowVig_ag,
          MAX(CASE WHEN md.sportsbook = 'BetOnline.ag' THEN md.price ELSE NULL END) AS BetOnline_ag
        FROM
          market_data md
        JOIN
          ev_calculation ev
        ON
          md.game_id = ev.game_id
          AND md.home_team = ev.home_team
          AND md.away_team = ev.away_team
          AND md.commence_time = ev.commence_time
          AND md.market = ev.market
          AND md.line = ev.line
          AND md.team = ev.team
        GROUP BY
          md.sport_key, md.commence_time, md.home_team, md.away_team, md.market, md.line, ev.avg_implied_odds, ev.max_ev
        ORDER BY
          ev.max_ev DESC;
      `,
        [],
        (err, rows) => {
          if (err) {
            reject(err); // Reject the promise on error
          } else {
            resolve(rows); // Resolve the promise with the rows
          }
        }
      );
    });

    db.close(); // Close the database connection
  });
}

module.exports = { processDataToSQL };
