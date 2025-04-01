import { Request, Response } from "express";
import { getAllEvents, getEventById } from "../services/event.service";

export async function fetchAllEvents(req: Request, res: Response) {
  const events = await getAllEvents();

  res.status(200).json(events);
}
export async function fetchEventById(req: Request, res: Response) {
  const { id } = req.params;
  const event = await getEventById(Number(id));

  if (event) {
    res.status(200).json(event);
  }
  else {
    res.status(404).json({ message: "Event not found" });
  }
}
