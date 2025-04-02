import { Request, Response } from "express";
import { createEvent, deleteEvent, getAllEvents, getEventById, updateEvent } from "../services/event.service";

// This controller handles the logic for fetching events.
export async function fetchAllEvents(req: Request, res: Response) {
  const events = await getAllEvents();

  res.status(200).json(events);
}

// This controller handles the logic for fetching a single event by ID.
export async function fetchEventById(req: Request, res: Response) {
  const { id } = req.params;
  const event = await getEventById(Number(id));

  if (event) {
    console.log("Event in controller:", event);
    res.status(200).json(event);
  }
  else {
    res.status(404).json({ message: "Event not found" });
  }
}

// This controller handles the logic for creating a new event.
export async function createNewEvent(req: Request, res: Response) {
  const eventData = req.body;

  // Assuming you have a service function to create a new event
  const newEvent = await createEvent(eventData);

  res.status(201).json(newEvent);
}

// This controller handles the logic for updating an event by ID.
export async function updateEventById(req: Request, res: Response) {
  const { id } = req.params;
  const eventData = req.body;

  // Assuming you have a service function to update the event
  const updatedEvent = await updateEvent(Number(id), eventData);

  if (updatedEvent) {
    res.status(200).json(updatedEvent);
  }
  else {
    res.status(404).json({ message: "Event not found" });
  }
}

// This controller handles the logic for deleting an event by ID.
export async function deleteEventById(req: Request, res: Response) {
  const { id } = req.params;

  // Assuming you have a service function to delete the event
  const deleted = await deleteEvent(Number(id));

  if (deleted) {
    res.status(200).json({ message: "Event deleted successfully" });
  }
  else {
    res.status(404).json({ message: "Event not found" });
  }
}