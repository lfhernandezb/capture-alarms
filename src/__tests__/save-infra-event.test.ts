import { Sequelize, DataTypes } from "sequelize";
import { InfraEvent, Equipment } from "../model/infra-event.model";

describe("saveInfraEvent", () => {
  let sequelize: Sequelize;

  beforeAll(async () => {
    // Initialize an in-memory SQLite database
    sequelize = new Sequelize("sqlite::memory:", { logging: false });

    // Reinitialize models with the in-memory database
    Equipment.init(
      {
        id: { type: DataTypes.STRING, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        type: { type: DataTypes.STRING, allowNull: false },
        ip: { type: DataTypes.STRING, allowNull: false },
        hostname: { type: DataTypes.STRING, allowNull: false },
        os: { type: DataTypes.STRING, allowNull: false },
        os_version: { type: DataTypes.STRING, allowNull: false },
      },
      { sequelize, tableName: "equipment" }
    );

    InfraEvent.init(
      {
        id: { type: DataTypes.STRING, primaryKey: true },
        origin: { type: DataTypes.STRING, allowNull: false },
        eventid: { type: DataTypes.STRING, allowNull: false },
        equipmentId: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: false },
        status: { type: DataTypes.STRING, allowNull: false },
        acknowledged: { type: DataTypes.BOOLEAN, allowNull: false },
        severity: { type: DataTypes.STRING, allowNull: false },
        timestamp: { type: DataTypes.DATE, allowNull: false },
        detail: { type: DataTypes.TEXT, allowNull: false },
      },
      { sequelize, tableName: "infra_events" }
    );

    // Define associations
    InfraEvent.belongsTo(Equipment, { foreignKey: "equipmentId", as: "Equipment" });
    Equipment.hasMany(InfraEvent, { foreignKey: "equipmentId" });

    // Sync the models
    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test("should save an InfraEvent and its associated Equipment", async () => {
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

    // Verify the InfraEvent was saved
    const savedInfraEvent = await InfraEvent.findByPk("event1", {
      include: { model: Equipment, as: "Equipment" },
    });

    expect(savedInfraEvent).not.toBeNull();
    expect(savedInfraEvent?.id).toBe("event1");
    expect(savedInfraEvent?.equipmentId).toBe("eq1");
    expect(savedInfraEvent?.equipment?.name).toBe("Server 1");
  });
});