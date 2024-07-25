export const getOdds = async (api_key, sports, markets) => {
  try {
    const response = await fetch("/api/processOdds", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: api_key,
        sports: sports,
        markets: markets,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Network response was not ok: ${errorData.error}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching odds:", error);
    throw error;
  }
};
