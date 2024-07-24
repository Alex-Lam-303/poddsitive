import React from "react";
import { sportsMap } from "../constants/sportsMap";

import { Row, Col, Select } from "antd";

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
          <Col span={2} col-2 col-push-22>
            Sport:{" "}
          </Col>
          <Col span={22} col-22 col-push-2>
            <Select
              mode="multiple"
              onChange={(value) => onChangeOddOptions(value, "sport")}
              value={oddsOptions.sport}
              style={{ width: "100%" }}
            >
              {Object.entries(sportsMap).map(([key, value]) => (
                <Select.Option key={key} value={key}>
                  {value}
                </Select.Option>
              ))}
            </Select>
          </Col>
        </Row>
        <Row align="middle">
          <Col span={3} col-3 col-push-21>
            Markets:{" "}
          </Col>
          <Col span={21} col-21 col-push-3>
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
