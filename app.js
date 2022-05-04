const colors = require("colors");
const {
  opciones,
  pausa,
  leerInput,
  listarLugares,
} = require("./helpers/inquirer");
const { Busquedas } = require("./models/busquedas");
require("dotenv").config();

let main = async () => {
  let busquedas = new Busquedas();
  let opt = "";
  do {
    console.clear();
    opt = await opciones();

    switch (opt.Option) {
      case 1:
        let lugar = await leerInput();
        let lugaress = await busquedas.ciudad(lugar);
        let opt2 = await listarLugares(lugaress);

        if (opt2.id < 5) {
          let tempe = await busquedas.temp(
            lugaress[opt2.id].ltd,
            lugaress[opt2.id].lng
          );
          busquedas.agregarHistorial(lugaress[opt2.id].nombre);
          console.log(`\n Informacion de la ciudad \n`.blue);
          console.log(`Ciudad: ${lugaress[opt2.id].nombre}`);
          console.log(`Lat: ${lugaress[opt2.id].ltd}`);
          console.log(`Lng: ${lugaress[opt2.id].lng}`);
          console.log(`Temperatura: ${tempe.temp} C`);
          console.log(`Minima: ${tempe.temp_min} C`);
          console.log(`Maxima: ${tempe.temp_max} C`);
          console.log(`Clima: ${tempe.weather} \n`);
        }
        break;

      case 2:
        busquedas.leerDB();
        console.log()
        break;
    }
    if (opt.Option != 0) await pausa();
  } while (opt.Option != 0);
};

main();
