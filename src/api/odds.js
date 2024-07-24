export const convertDecimalToAmericanOdds = (decimalOdds) => {
  decimalOdds = parseFloat(decimalOdds);
  if (decimalOdds >= 2.0) {
    return "+" + String(Math.round((decimalOdds - 1) * 100));
  } else {
    return String(Math.round(-100 / (decimalOdds - 1)));
  }
};
