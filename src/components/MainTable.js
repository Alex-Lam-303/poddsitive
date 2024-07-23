import React from "react";
import { Table, Button } from "antd";
import {
  fanduel_icon,
  draftkings_icon,
  betmgm_icon,
  caesars_icon,
  betrivers_icon,
  mybookie_ag_icon,
  bovada_icon,
  betus_icon,
  lowvig_ag_icon,
  betonline_ag_icon,
} from "../assets/icons";
import "./MainTable.css";

class MainTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      odds: [],
      decimalOdds: true,
    };
  }

  sportsbooks = [
    { icon: fanduel_icon, alt: "FanDuel", dataIndex: "fanduel" },
    { icon: draftkings_icon, alt: "DraftKings", dataIndex: "draftkings" },
    { icon: betmgm_icon, alt: "BetMGM", dataIndex: "betmgm" },
    { icon: caesars_icon, alt: "Caesars", dataIndex: "caesars" },
    { icon: betrivers_icon, alt: "BetRivers", dataIndex: "betrivers" },
    { icon: mybookie_ag_icon, alt: "MyBookie.ag", dataIndex: "mybookie_ag" },
    { icon: bovada_icon, alt: "Bovada", dataIndex: "bovada" },
    { icon: betus_icon, alt: "BetUS", dataIndex: "betus" },
    { icon: lowvig_ag_icon, alt: "LowVig.ag", dataIndex: "lowvig_ag" },
    { icon: betonline_ag_icon, alt: "BetOnline.ag", dataIndex: "betonline_ag" },
  ];

  get sportsbookColumns() {
    return this.sportsbooks.map(({ icon, alt, dataIndex }) => ({
      title: <img className="sportsbook_icon" src={icon} alt={alt} />,
      dataIndex: dataIndex,
      key: dataIndex,
      render: (text) =>
        text ? (
          <span>
            {this.state.decimalOdds
              ? text
              : this.convertDecimalToAmericanOdds(text)}
          </span>
        ) : null,
    }));
  }

  columns = [
    {
      title: "Sport Title",
      dataIndex: "sport_title",
      key: "sport_title",
    },
    {
      title: "Date",
      dataIndex: "commence_date",
      key: "commence_date",
    },
    {
      title: "Time",
      dataIndex: "commence_time",
      key: "commence_time",
    },
    {
      title: "Home Team",
      dataIndex: "home_team",
      key: "home_team",
    },
    {
      title: "Away Team",
      dataIndex: "away_team",
      key: "away_team",
    },
    {
      title: "Market",
      dataIndex: "market",
      key: "market",
    },
    {
      title: "Line",
      dataIndex: "line",
      key: "line",
    },
    {
      title: "Implied Odds",
      dataIndex: "implied_odds",
      key: "implied_odds",
      render: (text) => <span>{text}%</span>,
    },
    {
      title: "Positive EV",
      dataIndex: "positive_ev",
      key: "positive_ev",
      render: (text) => (
        <span style={{ color: text > 0 ? "green" : text < 0 ? "red" : "grey" }}>
          {text}%
        </span>
      ),
    },
    ...this.sportsbookColumns,
  ];

  convertDecimalToAmericanOdds = (decimalOdds) => {
    decimalOdds = parseFloat(decimalOdds);
    if (decimalOdds >= 2.0) {
      return "+" + String(Math.round((decimalOdds - 1) * 100));
    } else {
      return String(Math.round(-100 / (decimalOdds - 1)));
    }
  };

  transformOdds = (oddsData) => {
    return oddsData.map((odds) => {
      const commenceDateTime = new Date(odds[0]);
      const commence_date = commenceDateTime.toLocaleDateString();
      const commence_time = commenceDateTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }); // Format the time

      return {
        sport_title: "MLB",
        commence_date,
        commence_time,
        home_team: odds[1],
        away_team: odds[2],
        market: odds[3],
        line: odds[4],
        implied_odds: odds[5],
        positive_ev: odds[6],
        fanduel: odds[7],
        draftkings: odds[8],
        betmgm: odds[9],
        caesars: odds[10],
        betrivers: odds[10],
        mybookie_ag: odds[11],
        bovada: odds[12],
        betus: odds[13],
        lowvig_ag: odds[14],
        betonline_ag: odds[15],
      };
    });
  };

  getOdds = () => {
    fetch("http://127.0.0.1:5000/get-odds")
      .then((response) => response.json())
      .then((data) => {
        console.log(this.transformOdds(data));
        this.setState({ odds: this.transformOdds(data) });
      });
  };

  componentDidMount() {
    this.getOdds();
  }

  render() {
    return (
      <>
        <Button
          onClick={() =>
            this.setState({ decimalOdds: !this.state.decimalOdds })
          }
        >
          {this.state.decimalOdds ? "Decimal" : "American"}
        </Button>
        <div style={{ height: "75vh", overflow: "auto" }}>
          <Table
            columns={this.columns}
            dataSource={this.state.odds}
            rowKey="game_id"
            pagination={false} // Disable pagination
          />
        </div>
      </>
    );
  }
}

export default MainTable;
