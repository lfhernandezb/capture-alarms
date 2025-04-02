import { Sequelize } from "sequelize";
import { Equipment, InfraEvent } from "../model/infra-event.model";
import { createEquipment, getEquipmentById } from "./equipment.repository";

async function getInfraEventById(id: number): Promise<InfraEvent | null> {
  try {
    const infraEvent = await InfraEvent.findOne({
      where: { id },
      include: [{ model: Equipment, as: "equipment" }], // Include the associated equipment data if it exists
    });
    /*
    // Include the associated equipment data if it exists
    if (infraEvent && infraEvent.equipmentId) {
      const equipment = await getEquipmentById(infraEvent.equipmentId); // Assuming you have a method to get the associated equipment
      infraEvent.equipment = equipment ?? undefined; // Set the equipment object in the InfraEvent instance
      console.log("Equipment data included in InfraEvent:", infraEvent.equipment);
    }
    */
    return infraEvent;
  } catch (error) {
    console.error("Error fetching InfraEvent by ID:", error);
    throw error;
  }
}

async function getInfraEventByOriginAndEventId(origin: string, eventid: string): Promise<InfraEvent | null> {
  try {
    const infraEvent = await InfraEvent.findOne({
      where: { origin, eventid },
      include: [{ model: Equipment, as: "equipment" }], // Include the associated equipment data if it exists
    });
    return infraEvent;
  } catch (error) {
    console.error("Error fetching InfraEvent by Event ID:", error);
    throw error;
  }
}
async function getAllInfraEventsByOrigin(origin: string): Promise<InfraEvent[] | null> {
  try {
    const infraEvent = await InfraEvent.findAll({
      where: { origin },
      include: [{ model: Equipment, as: "equipment" }], // Include the associated equipment data if it exists
    });
    return infraEvent;
  } catch (error) {
    console.error("Error fetching InfraEvent by Origin:", error);
    throw error;
  }
}
async function getAllInfraEvents(): Promise<InfraEvent[]> {
  try {
    const infraEvents = await InfraEvent.findAll(
      {
        include: [{ model: Equipment, as: "equipment" }], // Include the associated equipment data if it exists
      }
    );
    /*
    // iterate over the infraEvents and include the equipment data
    for (const infraEvent of infraEvents) {
      if (infraEvent.equipmentId) {
        const equipment = await getEquipmentById(infraEvent.equipmentId); // Assuming you have a method to get the associated equipment
        infraEvent.equipment = equipment ?? undefined; // Set the equipment object in the InfraEvent instance
      }
    }
    */
    return infraEvents;
  } catch (error) {
    console.error("Error fetching all InfraEvents:", error);
    throw error;
  }
}
async function createInfraEvent(infraEventData: Partial<InfraEvent>, options?: any): Promise<InfraEvent | void> {
  try {
    const infraEvent = await InfraEvent.create(infraEventData, options);
    return infraEvent;
  } catch (error) {
    console.error("Error creating InfraEvent:", error);
    throw error;
  }
}

async function createInfraEventWithTransaction(infraEvent: InfraEvent, sequelize: Sequelize): Promise<InfraEvent | void> {
  // Start a transaction
  const transaction = await sequelize.transaction();

  try {
    // Save Equipment first
    if (!infraEvent.equipment) {
      throw new Error("Equipment data is undefined");
    }

    const savedEquipment = await createEquipment(infraEvent.equipment, { transaction });

    if (!savedEquipment) {
      throw new Error("Failed to save equipment");
    }

    if (!infraEvent) {
      throw new Error("InfraEvent data is undefined");
    }

    if (!savedEquipment) {
      throw new Error("Failed to save equipment");
    }

    infraEvent.equipmentId = savedEquipment.id; // Set the foreign key
    infraEvent.equipment = savedEquipment; // Set the equipment object

    const savedInfraEvent = await createInfraEvent(infraEvent, { transaction });

    // Commit the transaction
    await transaction.commit();

    console.log("Transaction committed successfully.");
    return savedInfraEvent;
  } catch (error) {
    // Rollback the transaction in case of an error
    await transaction.rollback();
    console.error("Transaction rolled back due to an error:", error);
    throw error;
  }
}

async function updateInfraEvent(id: number, infraEventData: Partial<InfraEvent>): Promise<[number]> {
  try {
    const [updatedRows] = await InfraEvent.update(infraEventData, {
      where: { id },
      returning: false,
    });
    return [updatedRows];
  } catch (error) {
    console.error("Error updating InfraEvent:", error);
    throw error;
  }
}
async function deleteInfraEvent(id: number): Promise<number> {
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

export {
  getInfraEventById,
    getInfraEventByOriginAndEventId,
    getAllInfraEventsByOrigin,
    getAllInfraEvents,
    createInfraEvent,
    updateInfraEvent,
    deleteInfraEvent,
    createInfraEventWithTransaction,
    // Add any other functions you need for InfraEvent repository here
    // e.g., getInfraEventByStatus, getInfraEventBySeverity, etc.
}