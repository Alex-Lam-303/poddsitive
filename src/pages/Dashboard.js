import React from "react";
import { Row, Col } from "antd";
import { getOdds, transformOdds } from "../api/odds";
import MainTable from "../components/MainTable";
import HiddenSelector from "../components/HiddenSelector";
import OddsFormatSwitch from "../components/OddsFormatSwitch";
import RefreshOdds from "../components/RefreshOdds";
import OddsOptions from "../components/OddsOptions";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      decimalOdds: true,
      refreshOddsDate: new Date("July 24, 2024, 18:00"),
      odds: [],
      hiddenColumns: ["home_team", "away_team", "market", "grade"],
      hiddenSportsbooks: [],
      oddsOptions: {
        sport: ["baseball_mlb"],
        markets: ["h2h"],
        regions: "us",
        odds_format: "decimal",
        date_format: "iso",
      },
    };
  }

  fetchOdds = () => {
    getOdds()
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

  onChangeHiddenColumns = (value) => {
    this.setState({ hiddenColumns: value });
  };

  onChangeHiddenSportsbooks = (value) => {
    this.setState({ hiddenSportsbooks: value });
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
              <HiddenSelector
                hiddenColumns={this.state.hiddenColumns}
                hiddenSportsbooks={this.state.hiddenSportsbooks}
                onChangeHiddenColumns={this.onChangeHiddenColumns}
                onChangeHiddenSportsbooks={this.onChangeHiddenSportsbooks}
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
          hiddenColumns={this.state.hiddenColumns}
          hiddenSportsbooks={this.state.hiddenSportsbooks}
          decimalOdds={this.state.decimalOdds}
        />
      </>
    );
  }
}

export default Dashboard;
