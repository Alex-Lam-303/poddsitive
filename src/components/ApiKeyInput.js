import { InfoCircleOutlined } from "@ant-design/icons";
import { Col, Row, message, Tooltip, Button } from "antd";
import { ProFormText } from "@ant-design/pro-components";
import { saveUserAPIKey } from "../api/users";

const ApiKeyInput = ({ apiKey, onChangeAPIKey }) => {
  return (
    <div style={{ marginTop: 10 }}>
      <Row align="top">
        <Col flex="82px">
          <div
            style={{
              marginTop: "4.5px",
              display: "flex",
              alignItems: "center",
            }}
          >
            API Key
            <Tooltip
              title={
                <div>
                  Visit{" "}
                  <a
                    href="https://the-odds-api.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#499824" }}
                  >
                    the-odds-api.com
                  </a>{" "}
                  to get your free API key
                </div>
              }
            >
              <InfoCircleOutlined style={{ marginLeft: "5px" }} />
            </Tooltip>
            {"  "}:
          </div>
        </Col>
        <Col flex="auto">
          <ProFormText.Password
            name="apiKey"
            value={apiKey}
            fieldProps={{
              onChange: (e) => onChangeAPIKey(e.target.value),
            }}
            placeholder={"API Key"}
          />
        </Col>
        <Col flex="30px">
          <Button
            type="primary"
            onClick={async () => {
              try {
                await saveUserAPIKey(apiKey);
                message.success("OddsAPI Key Updated!");
              } catch (error) {
                message.error("Please create an account to save your API key!");
              }
            }}
            style={{ marginLeft: "10px" }}
          >
            Save
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default ApiKeyInput;
