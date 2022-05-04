const inquirer = require("inquirer");
const colors = require("colors");
const menuPreguntas = [
  {
    type: "list",
    name: "Option",
    message: `\n${
      "========================".yellow
    }\n Seleccione una opción \n${"========================".yellow} \n`,
    choices: [
      { value: 1, name: `${"1.".red} ${"Buscar ciudad".blue}` },
      { value: 2, name: `${"2.".red} ${"Historial.".blue}` },
      { value: 0, name: `${"0.".red} ${"Salir.".blue}` },
    ],
  },
];

const menuPausa = [
  {
    type: "input",
    name: "pausa",
    message: `Presione la tecla ${"ENTER".green} para continuar`,
  },
];

const question = [
  {
    type: "input",
    name: "desc",
    message: "Que ciudad quieres buscar? ",
    validate(value) {
      if (value.length === 0) {
        return "Ingrese una ciudad valida.";
      }
      return true;
    },
  },
];

const opciones = async () => {
  let option = inquirer.prompt(menuPreguntas);
  return option;
};
const pausa = async () => {
  let opcion = inquirer.prompt(menuPausa);
  return opcion;
};
const leerInput = async () => {
  const { desc } = await inquirer.prompt(question);
  return desc;
};

const listarLugares = async (lugares = []) => {
  let choices = lugares.map((lugar, i) => {
    return {
      value: i,
      name: `${lugar.nombre}`,
    };
  });
  choices.push({
    value: 5,
    name: "Salir",
  });
  const paSelec = [
    {
      type: "list",
      name: "id",
      message: "Selecciona una ciudad: ",
      choices,
    },
  ];
  let seleccion = inquirer.prompt(paSelec);
  return seleccion;
};

module.exports = {
  opciones,
  pausa,
  leerInput,
  listarLugares,
};
