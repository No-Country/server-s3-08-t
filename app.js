console.log("Hola Server - HealtConnect");

require("dotenv").config();

const doctors = require("./models/doctors");
const doctorsPrueba = require("./models/doctorsPrueba");
const Type = require("./models/doctorTypes");
const Server = require("./models/server");

const server = new Server();

server.listen();

// const creates = () => {
//   Type.create({
//     nameType: "ginecologo",
//   });
// };

// creates();

/*const createDoc = () => {
doctorsPrueba.create({
    dni: "18697185",
    doctorName: "Joshua Agudelo",
    doctorEmail: "joshua@gmail.com",
    doctorAddress: "Cra 28 # 112-17",
    doctorCity: "Medellin",
    doctorCountry: "Colombia",
    doctorPhone: "6042589244",
    type: ["ginecologo", "internista"],
});
};

createDoc();*/
