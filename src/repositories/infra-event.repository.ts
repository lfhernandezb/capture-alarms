import { InfraEvent } from "../model/infra-event.model";

async function getInfraEventById(id: string): Promise<InfraEvent | null> {
  try {
    const infraEvent = await InfraEvent.findOne({
      where: { id },
    });
    return infraEvent;
  } catch (error) {
    console.error("Error fetching InfraEvent by ID:", error);
    throw error;
  }
}

async function getInfraEventByEventId(eventid: string): Promise<InfraEvent | null> {
  try {
    const infraEvent = await InfraEvent.findOne({
      where: { eventid },
    });
    return infraEvent;
  } catch (error) {
    console.error("Error fetching InfraEvent by Event ID:", error);
    throw error;
  }
}
async function getInfraEventByOrigin(origin: string): Promise<InfraEvent | null> {
  try {
    const infraEvent = await InfraEvent.findOne({
      where: { origin },
    });
    return infraEvent;
  } catch (error) {
    console.error("Error fetching InfraEvent by Origin:", error);
    throw error;
  }
}
async function getAllInfraEvents(): Promise<InfraEvent[]> {
  try {
    const infraEvents = await InfraEvent.findAll();
    return infraEvents;
  } catch (error) {
    console.error("Error fetching all InfraEvents:", error);
    throw error;
  }
}
async function createInfraEvent(infraEventData: Partial<InfraEvent>): Promise<InfraEvent> {
  try {
    const infraEvent = await InfraEvent.create(infraEventData);
    return infraEvent;
  } catch (error) {
    console.error("Error creating InfraEvent:", error);
    throw error;
  }
}
async function updateInfraEvent(id: string, infraEventData: Partial<InfraEvent>): Promise<[number, InfraEvent[]]> {
  try {
    const [updatedRows, updatedInfraEvent] = await InfraEvent.update(infraEventData, {
      where: { id },
      returning: true,
    });
    return [updatedRows, updatedInfraEvent];
  } catch (error) {
    console.error("Error updating InfraEvent:", error);
    throw error;
  }
}
async function deleteInfraEvent(id: string): Promise<number> {
  try {
    const deletedRows = await InfraEvent.destroy({
      where: { id },
    });
    return deletedRows;
  } catch (error) {
    console.error("Error deleting InfraEvent:", error);
    throw error;
  }
}
async function getInfraEventByName(name: string): Promise<InfraEvent | null> {
  try {
    const infraEvent = await InfraEvent.findOne({
      where: { name },
    });
    return infraEvent;
  } catch (error) {
    console.error("Error fetching InfraEvent by name:", error);
    throw error;
  }
}

export {
  getInfraEventById,
    getInfraEventByEventId,
    getInfraEventByOrigin,
    getAllInfraEvents,
    createInfraEvent,
    updateInfraEvent,
    deleteInfraEvent,
    getInfraEventByName,
    // Add any other functions you need for InfraEvent repository here
    // e.g., getInfraEventByStatus, getInfraEventBySeverity, etc.
}