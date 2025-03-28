import { Router, Request, Response } from "express";
import { receiveWazuhAlert, welcome } from "../controllers/wazuh.controller";
import { receiveZabbixAlert } from "../controllers/zabbix.controller";

class NotificationRoutes {
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

export default new NotificationRoutes().router;