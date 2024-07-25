import React from "react";
import { Row, Col } from "antd";
import { getOdds, transformOdds } from "../api/odds";
import MainTable from "../components/MainTable";
import ShownSelector from "../components/ShownSelector";
import OddsFormatSwitch from "../components/OddsFormatSwitch";
import RefreshOdds from "../components/RefreshOdds";
import OddsOptions from "../components/OddsOptions";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      decimalOdds: true,
      refreshOddsDate: new Date("July 24, 2024, 16:00"),
      odds: [],
      shownColumns: [
        "sport",
        "commence_datetime",
        "home_team",
        "away_team",
        "market",
        "line",
        "probability",
        "pick",
        "implied_odds",
        "positive_ev",
        "grade",
      ],
      shownSportsbooks: [
        "fanduel",
        "draftkings",
        "betmgm",
        "caesars",
        "betrivers",
        "mybookie_ag",
        "bovada",
        "betus",
        "lowvig_ag",
        "betonline_ag",
      ],
      oddsOptions: {
        sports: ["baseball_mlb"],
        markets: ["h2h"],
        regions: "us",
        odds_format: "decimal",
        date_format: "iso",
      },
    };
  }

  fetchOdds = () => {
    getOdds(this.state.oddsOptions.sports, this.state.oddsOptions.markets)
      .then((data) => {
        this.setState({ odds: transformOdds(data) });
      })
      .catch((error) => {
        console.error("Error fetching odds:", error);
      });
  };

  componentDidMount() {
    this.fetchOdds();
  }

  onChangeShownColumns = (value) => {
    this.setState({ shownColumns: value });
  };

  onChangeShownSportsbooks = (value) => {
    this.setState({ shownSportsbooks: value });
  };

  onChangeOddsFormat = (value) => {
    this.setState({ decimalOdds: value });
  };

  onChangeOddOptions = (value, key) => {
    this.setState((prevState) => ({
      oddsOptions: {
        ...prevState.oddsOptions,
        [key]: value,
      },
    }));
  };

  render() {
    return (
      <>
        <div
          style={{
            margin: "10px 1% 10px 1%",
            height: "20%",
          }}
        >
          <Row gutter={30}>
            <Col span={12}>
              <Row style={{ marginLeft: 5, marginBottom: 10 }}>
                <OddsFormatSwitch
                  decimalOdds={this.state.decimalOdds}
                  onChangeOddsFormat={this.onChangeOddsFormat}
                />
              </Row>
              <ShownSelector
                shownColumns={this.state.shownColumns}
                shownSportsbooks={this.state.shownSportsbooks}
                onChangeShownColumns={this.onChangeShownColumns}
                onChangeShownSportsbooks={this.onChangeShownSportsbooks}
              />
            </Col>
            <Col span={12}>
              <Row gutter={30}>
                <Col span={20} style={{ marginTop: 5 }}>
                  <OddsOptions
                    oddsOptions={this.state.oddsOptions}
                    onChangeOddOptions={this.onChangeOddOptions}
                  />
                </Col>
                <Col span={4} style={{ marginTop: 45 }}>
                  <RefreshOdds
                    fetchOdds={this.fetchOdds}
                    refreshOddsDate={this.state.refreshOddsDate}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <MainTable
          odds={this.state.odds}
          shownColumns={this.state.shownColumns}
          shownSportsbooks={this.state.shownSportsbooks}
          decimalOdds={this.state.decimalOdds}
        />
      </>
    );
  }
}

export default Dashboard;
