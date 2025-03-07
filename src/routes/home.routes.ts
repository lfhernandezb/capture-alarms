import { Router, Request, Response } from "express";
import { receiveAlert, welcome } from "../controllers/home.controller";

class HomeRoutes {
  router = Router();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get("/", welcome);
    this.router.post("/alert", receiveAlert);
  }
}

export default new HomeRoutes().router;