import React, { Component } from "react";
import { Select, Button } from "antd";

class Selector extends Component {
  state = {
    sport: "baseball_mlb",
    regions: "us",
    markets: "h2h",
    oddsFormat: "decimal",
    dateFormat: "iso",
  };

  options = {
    sports: [
      { label: "MLB", value: "baseball_mlb" },
      { label: "NFL", value: "football_nfl" },
      { label: "NBA", value: "basketball_nba" },
    ],
    regions: [
      { label: "US", value: "us" },
      { label: "Europe", value: "eu" },
    ],
    markets: [
      { label: "Moneyline", value: "h2h" },
      { label: "Spreads", value: "spreads" },
      { label: "Totals", value: "totals" },
    ],
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Select
          placeholder="Select Sport"
          value={this.state.sport}
          style={{ marginRight: "10px" }}
        >
          {this.options.sports.map((sport) => (
            <Select.Option key={sport.value} value={sport.value}>
              {sport.label}
            </Select.Option>
          ))}
        </Select>
        <Select
          placeholder="Select Market"
          value={this.state.markets}
          style={{ marginRight: "10px" }}
        >
          {this.options.markets.map((market) => (
            <Select.Option key={market.value} value={market.value}>
              {market.label}
            </Select.Option>
          ))}
        </Select>
        <Button type="primary">Get Data</Button>
      </div>
    );
  }
}

export default Selector;
