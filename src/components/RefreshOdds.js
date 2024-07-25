"use client";

import { Progress, Button, Tooltip, message } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

const OddsFormatSwitch = ({ refreshOddsDate, fetchOdds }) => {
  const timeLeft = refreshOddsDate.getTime() - Date.now();
  const progress = Math.round((timeLeft / (3 * 60 * 60 * 1000)) * 100);

  const hitLimitNotification = () => {
    message.error(
      "You have reached the limit for refreshing odds. Please try again later.",
      3
    );
  };

  return (
    <>
      {100 - progress < 100 ? (
        <div
          onClick={() => {
            hitLimitNotification();
          }}
        >
          <Tooltip
            title={`Time until next refresh ${refreshOddsDate.toLocaleString()}`}
          >
            <Progress
              type="dashboard"
              size="small"
              percent={100 - progress}
              strokeColor="#499824"
            />
          </Tooltip>
        </div>
      ) : (
        <div style={{ cursor: "pointer" }} onClick={() => fetchOdds()}>
          <Button
            style={{
              height: "62px",
              width: "62px",
              transition: "transform 0.5s",
              cursor: "pointer",
              boxShadow: "none",
            }}
            shape="circle"
            type="primary"
            icon={
              <ReloadOutlined
                style={{ fontSize: "25px", transition: "transform 0.5s" }}
              />
            }
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "rotate(360deg)";
              e.currentTarget.querySelector("svg").style.transform =
                "rotate(360deg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "rotate(0deg)";
              e.currentTarget.querySelector("svg").style.transform =
                "rotate(0deg)";
            }}
          />
        </div>
      )}
    </>
  );
};

export default OddsFormatSwitch;
