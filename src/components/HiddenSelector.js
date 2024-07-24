import React from "react";

import { Checkbox, Row, Col, Collapse } from "antd";

const { Panel } = Collapse;

class HiddenSelector extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Collapse>
        <Panel header="Hide Columns" key="1">
          <Checkbox.Group
            style={{
              width: "100%",
            }}
            onChange={this.props.onChangeHiddenColumns}
          >
            <Row>
              <Col span={8}>
                <Checkbox value="commence_datetime">Start Time</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="home_team">Home Team</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="away_team">Away Team</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="market">Market</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="probability">Probability</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="grade">Grade</Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </Panel>
        <Panel header="Hide Sportsbooks" key="2">
          <Checkbox.Group
            style={{
              width: "100%",
            }}
            onChange={this.props.onChangeHiddenSportsbooks}
          >
            <Row>
              <Col span={8}>
                <Checkbox value="fanduel">FanDuel</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="draftkings">DraftKings</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="betmgm">BetMGM</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="caesars">Caesars</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="betrivers">BetRivers</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="mybookie_ag">MyBookie.ag</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="bovada">Bovada</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="betus">BetUS</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="lowvig_ag">LowVig.ag</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="betonline_ag">BetOnline.ag</Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </Panel>
      </Collapse>
    );
  }
}

export default HiddenSelector;
