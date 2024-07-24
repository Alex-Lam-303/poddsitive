export const gradeColorMap = {
  S: "#009c1a",
  "A+": "#22b600",
  A: "#22b600",
  "A-": "#22b600",
  B: "#7be382",
  C: "#f5d300",
  D: "red",
  F: "red",
};

export const gradeMap = (odds) => {
  if (odds > 5) return "S";
  if (odds > 4) return "A+";
  if (odds > 3) return "A";
  if (odds > 2) return "A-";
  if (odds > 1) return "B";
  if (odds > 0.5) return "C";
  if (odds > 0) return "D";
  if (odds == 0) return "F";
  return "";
};
