import React from "react";
import { Select, Switch } from "antd";

import { sportsMap } from "../constants/sportsMap";
import { getOdds } from "../api/dashboard";
import MainTable from "../components/MainTable";
import { gradeMap } from "../constants/gradeMap";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      odds: [],
      hiddenColumns: ["sport", "home_team", "away_team", "market", "grade"],
      hiddenSportsbooks: [],
      decimalOdds: true,
    };
  }

  transformOdds = (oddsData) => {
    return oddsData.map((odds) => {
      const sport = sportsMap[odds[0]];
      const last_updated = new Date(odds[1]).toLocaleString();
      const commence_datetime = new Date(odds[2]).toLocaleString();
      const live = new Date() > new Date(odds[2]);
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

  fetchOdds = () => {
    getOdds()
      .then((data) => {
        this.setState({ odds: this.transformOdds(data) });
      })
      .catch((error) => {
        console.error("Error fetching odds:", error);
      });
  };

  componentDidMount() {
    this.fetchOdds();
  }

  render() {
    return (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginLeft: "40px",
            marginTop: "10px",
            marginBottom: "10px",
            height: "15vh",
          }}
        >
          <div>
            Odds Format:{" "}
            <Switch
              defaultChecked
              unCheckedChildren="American"
              checkedChildren="Decimal"
              style={{
                backgroundColor: this.state.decimalOdds ? "#499824" : "",
              }}
              onChange={(value) => this.setState({ decimalOdds: value })}
            >
              {this.state.decimalOdds ? "Decimal" : "American"}
            </Switch>
          </div>
          <div>
            Hide Columns:{" "}
            <Select
              style={{ width: "80%" }}
              mode="multiple"
              placeholder="Hidden Columns"
              maxTagCount={9}
              value={this.state.hiddenColumns}
              onChange={(value) => this.setState({ hiddenColumns: value })}
            >
              <Select.Option value="sport">Sport</Select.Option>
              <Select.Option value="commence_datetime">
                Start Time
              </Select.Option>
              <Select.Option value="home_team">Home Team</Select.Option>
              <Select.Option value="away_team">Away Team</Select.Option>
              <Select.Option value="market">Market</Select.Option>
              <Select.Option value="line">Line</Select.Option>
              <Select.Option value="probability">Probability</Select.Option>
              <Select.Option value="implied_odds">Implied Odds</Select.Option>
              <Select.Option value="positive_ev">Positive EV</Select.Option>
              <Select.Option value="grade">Grade</Select.Option>
            </Select>
          </div>
          <div>
            Sportsbooks:{" "}
            <Select
              style={{ width: "80%" }}
              mode="multiple"
              maxTagCount={2}
              placeholder="Sportsbooks"
              value={this.state.hiddenSportsbooks}
              onChange={(value) =>
                this.setState({
                  hiddenSportsbooks: value,
                })
              }
            >
              {/* 
              {this.sportsbooks.map(({ icon, alt, dataIndex }) => (
                <Select.Option value={dataIndex}>{alt}</Select.Option>
              ))} */}
            </Select>
          </div>
        </div>
        <MainTable
          odds={this.state.odds}
          hiddenColumns={this.state.hiddenColumns}
          hiddenSportsbooks={this.state.hiddenSportsbooks}
          decimalOdds={this.state.decimalOdds}
        />
      </>
    );
  }
}

export default Dashboard;
