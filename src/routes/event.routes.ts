import { Router } from "express";
import { fetchAllEvents, fetchEventById, updateEventById, deleteEventById, createNewEvent } from "../controllers/event.controller";

class EventRoutes {
  router = Router();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get("/all", fetchAllEvents);
    this.router.get("/:id", fetchEventById);
    this.router.post("/", createNewEvent);
    this.router.put("/:id", updateEventById);
    this.router.delete("/:id", deleteEventById);
  }
}

export default new EventRoutes().router;