import React from "react";
import { Table, Button, Tag, Select, Input, Tooltip } from "antd";
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
import { sportsMap } from "../constants/sportsMap";
import "./MainTable.css";

class MainTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      odds: [],
      hiddenColumns: [
        "commence_date",
        "commence_time",
        "home_team",
        "away_team",
      ],
      hiddenSportsbooks: [],
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
      title: (
        <Tooltip title={alt}>
          <img className="sportsbook_icon" src={icon} alt={alt} />
        </Tooltip>
      ),
      dataIndex: dataIndex,
      key: dataIndex,
      hidden: this.state.hiddenSportsbooks.includes(dataIndex),
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

  get columns() {
    return [
      {
        title: "Live",
        dataIndex: "live",
        key: "live",
        render: (live) => (live ? <Tag color="red">LIVE</Tag> : null),
        hidden: this.state.hiddenColumns.includes("live"),
      },
      {
        title: "Last Updated",
        dataIndex: "last_updated",
        key: "last_updated",
        hidden: this.state.hiddenColumns.includes("last_updated"),
      },
      {
        title: "Sport",
        dataIndex: "sport",
        key: "sport",
        hidden: this.state.hiddenColumns.includes("sport"),
      },
      {
        title: "Date",
        dataIndex: "commence_date",
        key: "commence_date",
        hidden: this.state.hiddenColumns.includes("commence_date"),
      },
      {
        title: "Time",
        dataIndex: "commence_time",
        key: "commence_time",
        hidden: this.state.hiddenColumns.includes("commence_time"),
      },
      {
        title: "Home Team",
        dataIndex: "home_team",
        key: "home_team",
        hidden: this.state.hiddenColumns.includes("home_team"),
      },
      {
        title: "Away Team",
        dataIndex: "away_team",
        key: "away_team",
        hidden: this.state.hiddenColumns.includes("away_team"),
      },
      {
        title: "Market",
        dataIndex: "market",
        key: "market",
        hidden: this.state.hiddenColumns.includes("market"),
      },
      {
        title: "Line",
        dataIndex: "line",
        key: "line",
        hidden: this.state.hiddenColumns.includes("line"),
      },
      {
        title: "Probability",
        dataIndex: "probability",
        key: "probability",
        render: (text) => <span>{text}%</span>,
        hidden: this.state.hiddenColumns.includes("probability"),
      },
      {
        title: "Implied Odds",
        dataIndex: "implied_odds",
        key: "implied_odds",
        render: (text) => (
          <span>
            {this.state.decimalOdds
              ? text
              : this.convertDecimalToAmericanOdds(text)}
          </span>
        ),
        hidden: this.state.hiddenColumns.includes("implied_odds"),
      },
      {
        title: "Positive EV",
        dataIndex: "positive_ev",
        key: "positive_ev",
        render: (text) => (
          <Tag color={text > 0 ? "green" : text < 0 ? "red" : "grey"}>
            {text}%
          </Tag>
        ),
      },
      {
        title: "Grade",
        dataIndex: "grade",
        key: "grade",
        render: (text) => (
          <Tag
            color={
              text === "S"
                ? "#009c1a"
                : text === "A+"
                ? "#22b600"
                : text === "A"
                ? "#22b600"
                : text === "A-"
                ? "#26cc00"
                : text === "B"
                ? "#7be382"
                : text === "C"
                ? "#accb9f"
                : text === "D"
                ? "#8a9287"
                : "red"
            }
          >
            {text}
          </Tag>
        ),
      },
      ...this.sportsbookColumns,
    ];
  }

  convertDecimalToAmericanOdds = (decimalOdds) => {
    decimalOdds = parseFloat(decimalOdds);
    if (decimalOdds >= 2.0) {
      return "+" + String(Math.round((decimalOdds - 1) * 100));
    } else {
      return String(Math.round(-100 / (decimalOdds - 1)));
    }
  };

  transformOdds = (oddsData) => {
    const date = new Date();
    return oddsData.map((odds) => {
      const commenceDateTime = new Date(odds[0]);
      const commence_date = commenceDateTime.toLocaleDateString();
      const commence_time = commenceDateTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      return {
        sport: sportsMap[odds[0]],
        live: date > new Date(odds[1]),
        last_updated: new Date(odds[1]).toLocaleString(),
        commence_date,
        commence_time,
        home_team: odds[3],
        away_team: odds[4],
        market: odds[5],
        line: odds[6],
        probability: odds[7],
        implied_odds: Math.round(((1 / odds[7]) * 100 + 1) * 100) / 100,
        positive_ev: odds[8],
        grade:
          odds[8] > 5
            ? "S"
            : odds[8] > 4
            ? "A+"
            : odds[8] > 3
            ? "A"
            : odds[8] > 2
            ? "A-"
            : odds[8] > 1
            ? "B"
            : odds[8] > 0.5
            ? "C"
            : odds[8] > 0
            ? "D"
            : "F",
        fanduel: odds[9],
        draftkings: odds[10],
        betmgm: odds[11],
        caesars: odds[12],
        betrivers: odds[13],
        mybookie_ag: odds[14],
        bovada: odds[15],
        betus: odds[16],
        lowvig_ag: odds[17],
        betonline_ag: odds[18],
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
        <Input style={{ width: "25%" }} placeholder="Search" />
        <Select
          style={{ width: "10%" }}
          mode="multiple"
          placeholder="Hidden Columns"
          value={this.state.hiddenColumns}
          onChange={(value) => this.setState({ hiddenColumns: value })}
        >
          <Select.Option value="sport">Sport</Select.Option>
          <Select.Option value="commence_date">Date</Select.Option>
          <Select.Option value="commence_time">Time</Select.Option>
          <Select.Option value="home_team">Home Team</Select.Option>
          <Select.Option value="away_team">Away Team</Select.Option>
          <Select.Option value="market">Market</Select.Option>
          <Select.Option value="line">Line</Select.Option>
          <Select.Option value="probability">Probability</Select.Option>
          <Select.Option value="implied_odds">Implied Odds</Select.Option>
          <Select.Option value="positive_ev">Positive EV</Select.Option>
        </Select>
        <Select
          style={{ width: "10%" }}
          mode="multiple"
          maxTagCount={0}
          placeholder="Sportsbooks"
          value={this.state.hiddenSportsbooks}
          onChange={(value) =>
            this.setState({
              hiddenSportsbooks: value,
            })
          }
        >
          {this.sportsbooks.map(({ icon, alt, dataIndex }) => (
            <Select.Option value={dataIndex}>{alt}</Select.Option>
          ))}
        </Select>
        <div style={{ height: "75vh", overflow: "auto" }}>
          <Table
            columns={this.columns}
            dataSource={this.state.odds}
            rowKey="game_id"
            pagination={false}
          />
        </div>
      </>
    );
  }
}

export default MainTable;
