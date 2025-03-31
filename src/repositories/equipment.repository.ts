import { Equipment } from "../model/infra-event.model";

async function getEquipmentById(id: string): Promise<Equipment | null> {
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
async function createEquipment(equipmentData: Partial<Equipment>): Promise<Equipment> {
  try {
    const equipment = await Equipment.create(equipmentData);
    return equipment;
  } catch (error) {
    console.error("Error creating equipment:", error);
    throw error;
  }
}
async function updateEquipment(id: string, equipmentData: Partial<Equipment>): Promise<[number, Equipment[]]> {
  try {
    const [updatedRows, updatedEquipment] = await Equipment.update(equipmentData, {
      where: { id },
      returning: true,
    });
    return [updatedRows, updatedEquipment];
  } catch (error) {
    console.error("Error updating equipment:", error);
    throw error;
  }
}
async function deleteEquipment(id: string): Promise<number> {
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