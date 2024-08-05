const admin = require("firebase-admin"); // Ensure you import admin if you're using it

const getOdds = async (api_key, sports, markets) => {
  try {
    const response = await fetch("https://www.poddsitive.com/api/processOdds", {
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

const saveDemoData = async (data) => {
  const db = admin.database();
  const demoRef = db.ref("demo");

  try {
    await demoRef.remove();
    const updates = {};
    data.forEach((doc, index) => {
      updates[`/${index}`] = doc;
    });
    await demoRef.update(updates);
    console.log("Demo data saved successfully.");
  } catch (error) {
    console.error("Error saving demo data:", error);
  }
};

module.exports = { getOdds, saveDemoData };
