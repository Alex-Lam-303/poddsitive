import React, { Component } from "react";
import { Table, Tag, Tooltip } from "antd";
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
  sportsbookIconMap,
} from "../assets/sportsbook_icons";
import { sportsIconMap } from "../assets/sports_icons";
import { gradeColorMap, gradeMap } from "../constants/gradeMap";
import { convertDecimalToAmericanOdds } from "../api/odds";
import "./MainTable.css";

class MainTable extends Component {
  constructor(props) {
    super(props);
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
      width: 80,
      hidden: this.props.hiddenSportsbooks.includes(dataIndex),
      render: (text) =>
        text ? (
          <span>
            {this.props.decimalOdds ? text : convertDecimalToAmericanOdds(text)}
          </span>
        ) : null,
    }));
  }

  get columns() {
    return [
      /* 
      {
        title: "Last Updated",
        dataIndex: "last_updated",
        key: "last_updated",
        hidden: this.props.hiddenColumns.includes("last_updated"),
      }, */
      {
        title: "Sport",
        dataIndex: "sport",
        key: "sport",
        width: 70,
        fixed: "left",
        hidden: this.props.hiddenColumns.includes("sport"),
        render: (text) => (
          <Tooltip title={text}>
            <div>
              <img
                className="sportsbook_icon"
                src={sportsIconMap[text]}
                alt={text}
              />
            </div>
          </Tooltip>
        ),
      },
      {
        title: "Start Time",
        dataIndex: "commence_datetime",
        key: "commence_datetime",
        width: 150,
        hidden: this.props.hiddenColumns.includes("commence_datetime"),
        render: (text) => {
          const now = new Date();
          const date = new Date(text);
          return (
            <span>
              {now > date ? (
                <Tooltip title="Live odds constantly change. Odds shown may have changed since the last update.">
                  <Tag color="red">LIVE</Tag>
                </Tooltip>
              ) : null}
              <br />
              {date.toLocaleString("en-US", {
                month: "numeric",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </span>
          );
        },
      },
      {
        title: "Home Team",
        dataIndex: "home_team",
        key: "home_team",
        width: 170,
        hidden: this.props.hiddenColumns.includes("home_team"),
      },
      {
        title: "Away Team",
        dataIndex: "away_team",
        key: "away_team",
        width: 170,
        hidden: this.props.hiddenColumns.includes("away_team"),
      },
      {
        title: "Market",
        dataIndex: "market",
        key: "market",
        width: 100,
        hidden: this.props.hiddenColumns.includes("market"),
      },
      {
        title: "Line",
        dataIndex: "line",
        key: "line",
        width: 200,
        hidden: this.props.hiddenColumns.includes("line"),
        fixed: "left",
      },
      {
        title: "Probability",
        dataIndex: "probability",
        key: "probability",
        width: 108,
        hidden: this.props.hiddenColumns.includes("probability"),
        render: (text) => <span>{text}%</span>,
      },
      {
        title: "Pick",
        dataIndex: "pick",
        key: "pick",
        width: 65,
        fixed: "left",
        hidden: this.props.hiddenColumns.includes("pick"),
        render: (text) =>
          text.map((pick) => {
            const icon = sportsbookIconMap[pick];
            return icon ? (
              <Tooltip title={pick}>
                <div>
                  <img className="sportsbook_icon" src={icon} alt={pick} />
                </div>
              </Tooltip>
            ) : null;
          }),
      },
      {
        title: "Implied Odds",
        dataIndex: "implied_odds",
        key: "implied_odds",
        width: 130,
        fixed: "left",
        hidden: this.props.hiddenColumns.includes("implied_odds"),
        render: (text) => (
          <span>
            {this.props.decimalOdds ? text : convertDecimalToAmericanOdds(text)}
          </span>
        ),
      },
      {
        title: "+EV%",
        dataIndex: "positive_ev",
        key: "positive_ev",
        width: 75,
        fixed: "left",
        hidden: this.props.hiddenColumns.includes("positive_ev"),
        render: (text) => (
          <Tag color={gradeColorMap[gradeMap(parseFloat(text))]}>{text}%</Tag>
        ),
      },
      {
        title: "Grade",
        dataIndex: "grade",
        key: "grade",
        width: 80,
        hidden: this.props.hiddenColumns.includes("grade"),
        render: (text) => <Tag color={gradeColorMap[text]}>{text}</Tag>,
      },
      ...this.sportsbookColumns,
    ];
  }

  render() {
    return (
      <div
        style={{
          width: "98%",
          overflow: "auto",
          height: "78vh",
          position: "absolute",
          right: 0,
          bottom: 0,
        }}
      >
        <Table
          columns={this.columns}
          dataSource={this.props.odds}
          rowKey="game_id"
          pagination={false}
          scroll={{
            y: "75vh",
          }}
        />
      </div>
    );
  }
}

export default MainTable;
