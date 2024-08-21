"use client";

import React, { useState } from "react";
import { Progress, Button, Tooltip, message, Spin } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

const RefreshOdds = ({ refreshOddsDate, fetchOdds, demoMode }) => {
  const [fetchingOdds, setFetchingOdds] = useState(false);

  const timeLeft = refreshOddsDate.getTime() - Date.now();
  const progress = Math.round((timeLeft / (3 * 60 * 60 * 1000)) * 100);

  const hitLimitNotification = () => {
    message.error(
      "You have reached the limit for refreshing odds. Please try again later.",
      3
    );
  };

  return fetchingOdds ? (
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
        <Spin
          indicator={
            <ReloadOutlined spin style={{ fontSize: "25px", color: "white" }} />
          }
        />
      }
    />
  ) : (
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
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            setFetchingOdds(true);
            fetchOdds().finally(() => setFetchingOdds(false));
          }}
        >
          <Button
            style={{
              height: "62px",
              width: "62px",
              transition: "transform 0.5s",
              cursor: demoMode ? "not-allowed" : "pointer",
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
            disabled={demoMode}
          />
        </div>
      )}
    </>
  );
};

export default RefreshOdds;
