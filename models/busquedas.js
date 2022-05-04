const fs = require("fs");
const axios = require("axios").default;
let data = require("../db/data.json");
//-------------------- Clase para buscar ---------------//
class Busquedas {
  historial = data;
  constructor() {}
  
  async ciudad(lugar = "") {
    let opcioness = "";
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: {
         access_token:
         process.env.MAPBOX_KEY,
         limit: 5,
         language: "es"

        },
      });
      let resp = await instance.get();
      opcioness = resp.data.features.map((element) => ({
        id: element.id,
        nombre: element.place_name,
        lng: element.center[0],
        ltd: element.center[1],
      }));
    } catch (error) {}
    return opcioness; //retornar los lugares
  }

  async temp(lat, lon) {
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: {
          lat: lat,
          lon: lon,
          units: "metric",
          appid: "55a457dde74bcca4d1abd93fad630810",
          lang: "es",
        },
      });
      let respu = await instance.get();
      let { main, weather } = respu.data;
      return {
        temp: main.temp,
        temp_max: main.temp_max,
        temp_min: main.temp_min,
        weather: weather[0].description,
      };
    } catch (error) {
      return error;
    }
  }

  agregarHistorial(lugar = "") {
    //revisar que no este
    if (this.historial.length >= 5) {
      this.historial.pop();
      this.historial.unshift(lugar);
    } else if (!this.historial.includes(lugar)) {
      this.historial.unshift(lugar);
    }
    this.grabarDB();
  }
  grabarDB() {
    fs.writeFileSync("./db/data.json", JSON.stringify(this.historial));
  }
  leerDB() {
    this.historial.forEach((element, i) =>
      console.log(`${`${i + 1}.`.green} ${element}`)
    );
  }
}

module.exports = {
  Busquedas,
};
