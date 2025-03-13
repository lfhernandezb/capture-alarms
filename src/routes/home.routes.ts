import { Router, Request, Response } from "express";
import { receiveWazuhAlert, receiveZabbixAlert, welcome } from "../controllers/home.controller";

class HomeRoutes {
  router = Router();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get("/", welcome);
    this.router.post("/alert/wazuh", receiveWazuhAlert);
    this.router.post("/alert/zabbix", receiveZabbixAlert);
  }
}

export default new HomeRoutes().router;