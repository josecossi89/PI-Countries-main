const { Router } = require("express");
const { Activity, Country } = require("../db.js");

const router = Router();

router.post("/", async (req, res) => {
  const { name, difficulty, duration, season, countries } = req.body;

  try {
    const [activity, created] = await Activity.findOrCreate({
      where: {
        name,
        difficulty,
        duration,
        season,
      },
    });

    await activity.addCountries(countries);

    res.status(200).json("Activity created");
  } catch (err) {
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  try {
    let activities = await Activity.findAll();
    res.json(activities);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
