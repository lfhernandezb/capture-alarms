// Description: This file contains the service functions for handling InfraEvent operations.
// It includes functions to create, update, delete, and retrieve InfraEvent records from the database.
// and is part of a larger application that manages infrastructure events.
import { InfraEvent } from "../model/infra-event.model";
import { createInfraEvent, deleteInfraEvent, getAllInfraEvents, getInfraEventByOriginAndEventId, getInfraEventById, getAllInfraEventsByOrigin, updateInfraEvent } from "../repositories/infra-event.repository";

async function getEventById(eventId: number): Promise<any> {
// we use the InfraEvent repository to get the event by id
    const infraEvent = await getInfraEventById(eventId);

    if (!infraEvent) {
        throw new Error("Event not found");
    }
    return infraEvent;
}
async function getEventByOriginAndEventId(origin: string, eventId: string): Promise<any> {
// we use the InfraEvent repository to get the event by eventid
    const infraEvent = await getInfraEventByOriginAndEventId(origin, eventId);
    if (!infraEvent) {
        throw new Error("Event not found");
    }
    return infraEvent;
}
async function getAllEventsByOrigin(origin: string): Promise<any> {
// we use the InfraEvent repository to get the event by origin
    const infraEvent = await getAllInfraEventsByOrigin(origin);
    if (!infraEvent) {
        throw new Error("Event not found");
    }
    return infraEvent;
}
async function getAllEvents(): Promise<any[]> {
// we use the InfraEvent repository to get all events
    const infraEvents = await getAllInfraEvents();

    return infraEvents;
}
async function createEvent(eventData: Partial<InfraEvent>): Promise<any> {
// we use the InfraEvent repository to create the event
    const infraEvent = await createInfraEvent(eventData);
    return infraEvent;
}
async function updateEvent(eventId: number, eventData: Partial<InfraEvent>): Promise<any> {
// we use the InfraEvent repository to update the event
    const updatedEvent = await updateInfraEvent(eventId, eventData);
    if (!updatedEvent) {
        throw new Error("Event not found");
    }
    return updatedEvent;
}
async function deleteEvent(eventId: number): Promise<any> {
// we use the InfraEvent repository to delete the event
    const deletedEvent = await deleteInfraEvent(eventId);
    if (!deletedEvent) {
        throw new Error("Event not found");
    }
    return deletedEvent;
}

export {
    getEventById,
    getEventByOriginAndEventId,
    getAllEventsByOrigin,
    getAllEvents,
    createEvent,
    updateEvent,
    deleteEvent,
};