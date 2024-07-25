import { InfoCircleOutlined } from "@ant-design/icons";
import { Col, Row, Input, Tooltip } from "antd";
import { useState } from "react";

const ApiKeyInput = ({ apiKey, onChangeAPIKey }) => {
  return (
    <div style={{ marginTop: 10 }}>
      <Row align="middle">
        <Col flex="67px">API Key: </Col>
        <Col flex="auto">
          <Input
            placeholder="API Key"
            value={apiKey}
            onChange={(e) => onChangeAPIKey(e.target.value)}
          />
        </Col>
        <Col flex="20px">
          <Tooltip
            title={
              <div>
                Visit{" "}
                <a
                  href="https://the-odds-api.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  the-odds-api.com
                </a>{" "}
                to get your free API key
              </div>
            }
          >
            <InfoCircleOutlined style={{ marginLeft: "5px" }} />
          </Tooltip>
        </Col>
      </Row>
    </div>
  );
};

export default ApiKeyInput;
