import React from "react";
import { Row, Col } from "antd";
import { getOdds } from "../api/dashboard";
import { transformOdds } from "../api/odds";
import MainTable from "../components/MainTable";
import HiddenSelector from "../components/HiddenSelector";
import OddsFormatSwitch from "../components/OddsFormatSwitch";
import RefreshOdds from "../components/RefreshOdds";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshOddsDate: new Date("July 24, 2024, 17:45"),
      odds: [],
      hiddenColumns: ["home_team", "away_team", "market", "grade"],
      hiddenSportsbooks: [],
      decimalOdds: true,
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

  render() {
    return (
      <>
        <div
          style={{
            margin: "10px 1% 10px 1%",
            height: "20%",
          }}
        >
          <Row>
            <Col span={18}>
              <OddsFormatSwitch
                decimalOdds={this.state.decimalOdds}
                onChangeOddsFormat={this.onChangeOddsFormat}
              />
              <HiddenSelector
                hiddenColumns={this.state.hiddenColumns}
                hiddenSportsbooks={this.state.hiddenSportsbooks}
                onChangeHiddenColumns={this.onChangeHiddenColumns}
                onChangeHiddenSportsbooks={this.onChangeHiddenSportsbooks}
              />
            </Col>
            <Col span={6}>
              <RefreshOdds refreshOddsDate={this.state.refreshOddsDate} />
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
