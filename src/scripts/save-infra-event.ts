import { sequelize, InfraEvent, Equipment } from "../model/infra-event.model";

async function saveInfraEvent() {
  try {
    // Sync models with the database
    await sequelize.sync({ force: true }); // Use `force: false` in production

    // Create an Equipment instance
    const equipment = await Equipment.create({
      id: "eq1",
      name: "Server 1",
      type: "Server",
      ip: "192.168.1.1",
      hostname: "server1.local",
      os: "Linux",
      os_version: "Ubuntu 20.04",
    });

    // Create an InfraEvent instance
    const infraEvent = await InfraEvent.create({
      id: "event1",
      origin: "Zabbix",
      eventid: "12345",
      equipmentId: equipment.id,
      description: "CPU usage high",
      status: "Active",
      acknowledged: false,
      severity: "High",
      timestamp: new Date(),
      detail: "CPU usage exceeded 90% for more than 5 minutes.",
    });

    console.log("InfraEvent saved:", infraEvent.toJSON());
  } catch (error) {
    console.error("Error saving InfraEvent:", error);
  } finally {
    await sequelize.close();
  }
}

saveInfraEvent();