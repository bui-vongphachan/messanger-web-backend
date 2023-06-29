import express from "express";
import bodyParser from "body-parser";
import Routes from "../routes";
import cors from "cors";

const expressApp = express();

expressApp.use(bodyParser.json());

expressApp.use(cors());

expressApp.options("*", cors());

expressApp.use("/api", Routes);

export { expressApp };
