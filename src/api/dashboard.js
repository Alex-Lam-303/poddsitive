export const getOdds = () => {
  return fetch("http://127.0.0.1:5000/get-odds")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};
