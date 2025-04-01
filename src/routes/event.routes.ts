import { Router } from "express";
import { fetchAllEvents, fetchEventById } from "../controllers/event.controller";

class EventRoutes {
  router = Router();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get("/all", fetchAllEvents);
    this.router.get("/:id", fetchEventById);
  }
}

export default new EventRoutes().router;