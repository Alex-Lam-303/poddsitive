"use client";

import React from "react";
import { sportsMap } from "../constants/sportsMap";
import { sportsIconMap } from "../assets/sports_icons";

import { Row, Col, Select, Flex } from "antd";

class OddOptions extends React.Component {
  render() {
    const { oddsOptions, onChangeOddOptions } = this.props;
    return (
      <>
        <Row>
          <div style={{ fontWeight: "bold", marginBottom: 10 }}>
            Odds Options:
          </div>
        </Row>
        <Row align="middle" style={{ marginBottom: 10 }}>
          <Col flex="50px">Sport: </Col>
          <Col flex="auto">
            <Select
              mode="multiple"
              onChange={(value) => onChangeOddOptions(value, "sports")}
              value={oddsOptions.sports}
              style={{ width: "100%" }}
            >
              {Object.entries(sportsMap).map(([key, value]) => (
                <Select.Option key={key} value={key}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: 3,
                        marginBottom: 1,
                      }}
                      src={sportsIconMap[value]}
                      alt={value}
                    />
                    <span style={{ marginLeft: 5 }}>{value}</span>
                  </div>
                </Select.Option>
              ))}
            </Select>
          </Col>
        </Row>
        <Row align="middle">
          <Col flex="67px">Markets: </Col>
          <Col flex="auto">
            <Select
              mode="multiple"
              onChange={(value) => onChangeOddOptions(value, "markets")}
              value={oddsOptions.markets}
              style={{ width: "100%" }}
            >
              <Select.Option key={"h2h"} value={"h2h"}>
                Moneyline
              </Select.Option>
              <Select.Option key={"totals"} value={"totals"}>
                Totals
              </Select.Option>
              <Select.Option key={"spreads"} value={"spreads"}>
                Spreads
              </Select.Option>
            </Select>
          </Col>
        </Row>
      </>
    );
  }
}

export default OddOptions;
