const { Router } = require("express");
const { Activity, Country, Op } = require("../db.js");

const router = Router();

router.post("/", async (req, res) => {
  const { name, difficulty, duration, season, countries } = req.body;
  let activity = null;
  try {
    const exists = await Activity.findAll({
      where: {
        name,
      },
    });
    if (exists.length > 0) {
      [activity] = exists;
    } else {
      [activity] = await Activity.findOrCreate({
        where: {
          name,
          difficulty,
          duration,
          season,
        },
      });
    }

    await activity.addCountries(countries);

    res.status(200).json("Activity created");
  } catch (err) {
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    let activities = [];
    if (name) {
      activities = await Activity.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
        include: [
          {
            model: Country,
          },
        ],
      });
    } else {
      activities = await Activity.findAll({
        include: [
          {
            model: Country,
          },
        ],
      });
    }
    res.json(activities);
  } catch (err) {
    console.error(err);
    console.error(`Error trying to fetch activities`, err);
  }
});
module.exports = router;
