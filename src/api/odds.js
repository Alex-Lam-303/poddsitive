export const getOdds = async (sports, markets) => {
  try {
    const response = await fetch("/api/processOdds", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sports: sports,
        markets: markets,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json(); // Get error details
      throw new Error(`Network response was not ok: ${errorData.error}`);
    }

    const data = await response.json(); // Await the JSON response
    return data; // Return the data
  } catch (error) {
    console.error("Error fetching odds:", error); // Use console.error for errors
    throw error; // Rethrow the error for further handling
  }
};
