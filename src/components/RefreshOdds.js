"use client";

import { Progress, message } from "antd";

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
          <Progress
            type="circle"
            size="small"
            percent={100 - progress}
            strokeColor="#499824"
          />
        </div>
      ) : (
        <div style={{ cursor: "pointer" }} onClick={() => fetchOdds()}>
          <Progress type="circle" size="small" percent={100 - progress} />
        </div>
      )}
    </>
  );
};

export default OddsFormatSwitch;
