//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const server = require("./src/app.js");
const { conn, Country } = require("./src/db.js");
const axios = require("axios");

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3001, async () => {
    let apiURL = await axios.get(`https://restcountries.com/v3.1/all`);
    apiURL = apiURL.data;

    let apiInfo = apiURL.forEach(async (country) => {
      Country.create({
        id: country.cca3,
        name: country.name.common,
        flags: country.flags.png,
        continent: country.region,
        capital: country.capital ? country.capital : [],
        area: country.area,
        subregion: country.subregion,
        population: country.population,
      });
    });

    console.log("%s listening at 3001"); // eslint-disable-line no-console
    return apiInfo;
  });
});
