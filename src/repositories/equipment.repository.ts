import { Equipment } from "../model/infra-event.model";

async function getEquipmentById(id: number): Promise<Equipment | null> {
  try {
    const equipment = await Equipment.findByPk(id);
    return equipment;
  } catch (error) {
    console.error("Error fetching equipment by ID:", error);
    throw error;
  }
}

async function getAllEquipment(): Promise<Equipment[]> {
  try {
    const equipmentList = await Equipment.findAll();
    return equipmentList;
  } catch (error) {
    console.error("Error fetching all equipment:", error);
    throw error;
  }
}
async function createEquipment(equipmentData: Partial<Equipment>, options?: any): Promise<Equipment | void> {
  try {
    const equipment = await Equipment.create(equipmentData, options);
    return equipment;
  } catch (error) {
    console.error("Error creating equipment:", error);
    throw error;
  }
}
async function updateEquipment(id: number, equipmentData: Partial<Equipment>): Promise<[number]> {
  try {
    const [updatedRows] = await Equipment.update(equipmentData, {
      where: { id },
      returning: false,
    });
    return [updatedRows];
  } catch (error) {
    console.error("Error updating equipment:", error);
    throw error;
  }
}
async function deleteEquipment(id: number): Promise<number> {
  try {
    const deletedRows = await Equipment.destroy({
      where: { id },
    });
    return deletedRows;
  } catch (error) {
    console.error("Error deleting equipment:", error);
    throw error;
  }
}
async function getEquipmentByName(name: string): Promise<Equipment | null> {
  try {
    const equipment = await Equipment.findOne({
      where: { name },
    });
    return equipment;
  } catch (error) {
    console.error("Error fetching equipment by name:", error);
    throw error;
  }
}

export {
  getEquipmentById,
    getAllEquipment,
    createEquipment,
    updateEquipment,
    deleteEquipment,
    getEquipmentByName,
}