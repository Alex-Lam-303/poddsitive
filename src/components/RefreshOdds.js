import { Progress } from "antd";

const OddsFormatSwitch = ({ refreshOddsDate }) => {
  const progress = Math.round(
    ((refreshOddsDate.getTime() - Date.now()) / (3 * 60 * 60 * 1000)) * 100
  );

  return (
    <div>
      <Progress type="circle" size="small" percent={progress} />
    </div>
  );
};

export default OddsFormatSwitch;
