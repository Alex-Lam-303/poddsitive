"use client";

import React from "react";
import { Row, Col, message } from "antd";
import { getOdds } from "../api/odds";
import { transformOdds } from "../utils/oddsUtils";
import MainTable from "../components/MainTable";
import ShownSelector from "../components/ShownSelector";
import OddsFormatSwitch from "../components/OddsFormatSwitch";
import RefreshOdds from "../components/RefreshOdds";
import OddsOptions from "../components/OddsOptions";
import ApiKeyInput from "../components/ApiKeyInput";
import localStorage from "local-storage";
import { getDatabase, ref, get } from "firebase/database";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey: localStorage.get("oddsapi_api_key") || "",
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
        sports: ["baseball_mlb"],
        markets: ["h2h"],
        regions: "us",
        odds_format: "decimal",
        date_format: "iso",
      },
    };
  }

  componentDidMount() {
    this.fetchDemoOdds();
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

      // Check if localStorage is functioning correctly
      if (this.state.apiKey) {
        localStorage.set("oddsapi_api_key", this.state.apiKey); // Use set instead of setItem
      }
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
                <Col span={4} style={{ marginTop: 45 }}>
                  <RefreshOdds
                    fetchOdds={this.fetchOdds}
                    refreshOddsDate={this.state.refreshOddsDate}
                    demoMode={this.props.demoMode}
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
