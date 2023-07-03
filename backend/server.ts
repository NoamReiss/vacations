import bodyParser from "body-parser";
import cors from "cors"; //npm install cors
import express from "express";
import fileUpload from "express-fileupload";

import router from "./Routes/Routes";
import config from "./Utils/Config";
import logic from "./Logic/Logic";
import ErrorHandler from "./MiddleWare/route-not-found";
import path from "path";
//create server
const server = express();

//handle cors
server.use(cors());

//how we send the data back (JSON)
server.use(express.json());

//where i will save the vacation files
server.use(express.static("public"));

//parse the body as json , for easy work
server.use(bodyParser.json());

//how to use the routes

server.use("/api/v1/vacations", router);

server.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public"));
});
//create our tables if they not exists

logic.createVacationTable();
logic.createUserTable();
logic.createFollowersTable();

//handle errors (route not found)
server.use("*", ErrorHandler);

//start the server
server.listen(config.WebPort, () => {
  console.log(`listening on http://${config.mySQLhost}:${config.WebPort}`);
});
