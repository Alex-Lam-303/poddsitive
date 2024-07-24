import { Switch } from "antd";

const OddsFormatSwitch = ({ decimalOdds, onChangeOddsFormat }) => {
  return (
    <div>
      Odds Format:{" "}
      <Switch
        defaultChecked
        unCheckedChildren="American"
        checkedChildren="Decimal"
        style={{
          backgroundColor: decimalOdds ? "#499824" : "#343a4e",
        }}
        onChange={(value) => onChangeOddsFormat(value)}
      >
        {decimalOdds ? "Decimal" : "American"}
      </Switch>
    </div>
  );
};

export default OddsFormatSwitch;
