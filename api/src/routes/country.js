const { Router } = require("express");
const { Country, Activity, Op } = require("../db.js");

const router = Router();

router.get("/", async (req, res) => {
  const name = req.query.name; //name from query(url)

  try {
    if (name) {
      const nameCountry = await Country.findAll({
        where: {
          name: {
            //match name
            [Op.iLike]: `%${name}%`,
          },
        },
      });
      //condition ternary
      nameCountry.length
        ? res.status(200).json(nameCountry)
        : res.status(404).send("Country not found");
    } else {
      const countries = await Country.findAll({
        attributes: ["id", "flags", "name", "continent", "population"],
      });

      res.status(200).json(countries);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error trying to fetch countries from database`, err);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params; //req from params

  try {
    const countryId = await Country.findByPk(id.toUpperCase(), {
      include: {
        model: Activity,
      },
    });

    countryId
      ? res.status(200).json(countryId)
      : res.status(404).send(`"Id not found in database`);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send(`Error trying to fetch country:${id}, from database`, err);
  }
});

module.exports = router;
