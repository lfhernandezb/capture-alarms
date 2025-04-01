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
    this.router.post("/wazuh", receiveWazuhAlert);
    this.router.post("/zabbix", receiveZabbixAlert);
  }
}

export default new NotificationRoutes().router;