import express from "express";
import cors from "cors";
import "express-async-errors";
// import errorHandler from "./Middlewares/errorHandler";
// import routes from "./Routers/Index";

const server = express();
server.use(express.json());
server.use(cors());
// server.use(routes);
// server.use(errorHandler);

export default server;
