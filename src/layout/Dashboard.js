"use client";

import React from "react";
import { Row, Col, message, Button } from "antd";
import { getOdds } from "../api/odds";
import { transformOdds } from "../utils/oddsUtils";
import MainTable from "../components/MainTable";
import ShownSelector from "../components/ShownSelector";
import OddsFormatSwitch from "../components/OddsFormatSwitch";
import RefreshOdds from "../components/RefreshOdds";
import OddsOptions from "../components/OddsOptions";
import ApiKeyInput from "../components/ApiKeyInput";
import { getDatabase, ref, get } from "firebase/database";
import { getUserAPIKey } from "../api/users";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey: "",
      decimalOdds: true,
      refreshOddsDate: new Date(), //new Date().getTime() + 15 * 60 * 1000),
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
        sports: [
          "baseball_mlb",
          "americanfootball_nfl",
          "basketball_nba",
          "icehockey_nhl",
        ],
        markets: ["h2h", "spreads", "totals"],
        regions: "us",
        odds_format: "decimal",
        date_format: "iso",
      },
      isMobile: window.innerWidth <= 768,
    };
  }

  async componentDidMount() {
    this.fetchDemoOdds();
    const apiKey = await getUserAPIKey();
    this.setState({ apiKey: apiKey || "" });
  }

  fetchOdds = async () => {
    if (this.props.demoMode) {
      this.fetchDemoOdds();
    } else {
      this.fetchLiveOdds();
    }
  };

  fetchLiveOdds = async () => {
    try {
      const data = await getOdds(
        this.state.apiKey,
        this.state.oddsOptions.sports,
        this.state.oddsOptions.markets
      );
      this.setState({ odds: transformOdds(data) });
    } catch (error) {
      message.error(
        "Error fetching odds. Please check your OddsAPI API key is valid."
      );
    }
  };

  fetchDemoOdds = async () => {
    const db = getDatabase();
    const demoRef = ref(db, "demo");
    try {
      const snapshot = await get(demoRef);
      if (snapshot.exists()) {
        const demoData = snapshot.val();
        this.setState({ odds: demoData });
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  };

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

  onChangeAPIKey = (value) => {
    this.setState({ apiKey: value });
  };

  render() {
    if (this.state.isMobile) {
      return (
        <div
          style={{
            height: "20%",
            padding: "5px",
          }}
        >
          <Row>
            <Col span={24}>
              <Row style={{ marginLeft: 5, marginBottom: 10 }}>
                <Col span={24}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <OddsFormatSwitch
                      decimalOdds={this.state.decimalOdds}
                      onChangeOddsFormat={this.onChangeOddsFormat}
                    />
                    <Button
                      type="primary"
                      size="medium"
                      onClick={this.fetchOdds}
                      disabled={this.props.demoMode}
                    >
                      Refresh Odds
                    </Button>
                  </div>
                </Col>
              </Row>
              <ShownSelector
                shownColumns={this.state.shownColumns}
                shownSportsbooks={this.state.shownSportsbooks}
                onChangeShownColumns={this.onChangeShownColumns}
                onChangeShownSportsbooks={this.onChangeShownSportsbooks}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ marginTop: 5 }}>
              <OddsOptions
                oddsOptions={this.state.oddsOptions}
                onChangeOddOptions={this.onChangeOddOptions}
              />
              <ApiKeyInput
                apiKey={this.state.apiKey}
                onChangeAPIKey={this.onChangeAPIKey}
              />
            </Col>
          </Row>
          <MainTable
            odds={this.state.odds}
            shownColumns={this.state.shownColumns}
            shownSportsbooks={this.state.shownSportsbooks}
            decimalOdds={this.state.decimalOdds}
          />
        </div>
      );
    }

    return (
      <>
        <div
          style={{
            margin: "10px 1% 10px 1%",
            height: "20%",
          }}
        >
          <Row gutter={30}>
            <Col span={11}>
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
            <Col span={13}>
              <Row gutter={30}>
                <Col span={20} style={{ marginTop: 5 }}>
                  <OddsOptions
                    oddsOptions={this.state.oddsOptions}
                    onChangeOddOptions={this.onChangeOddOptions}
                  />
                  <ApiKeyInput
                    apiKey={this.state.apiKey}
                    onChangeAPIKey={this.onChangeAPIKey}
                  />
                </Col>
                <Col span={4} style={{ paddingTop: 45 }}>
                  <RefreshOdds
                    fetchOdds={this.fetchOdds}
                    refreshOddsDate={this.state.refreshOddsDate}
                    demoMode={this.props.demoMode}
                  />
                </Col>
              </Row>
            </Col>
          </Row>

          <MainTable
            odds={this.state.odds}
            shownColumns={this.state.shownColumns}
            shownSportsbooks={this.state.shownSportsbooks}
            decimalOdds={this.state.decimalOdds}
          />
        </div>
      </>
    );
  }
}

export default Dashboard;
