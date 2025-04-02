import { Sequelize, DataTypes } from "sequelize";
import { Equipment, InfraEvent } from "../model/infra-event.model";
import {
  getInfraEventById,
  getInfraEventByOriginAndEventId,
  getAllInfraEventsByOrigin,
  getAllInfraEvents,
  createInfraEvent,
  updateInfraEvent,
  deleteInfraEvent,
} from "../repositories/infra-event.repository";
import { SequelizeStorage, Umzug } from "umzug";

describe("InfraEvent Repository", () => {
  let sequelize: Sequelize;

  beforeAll(async () => {
    // Initialize an in-memory SQLite database
    sequelize = new Sequelize("sqlite::memory:", { logging: true });

    // Initialize the Equipment model
    Equipment.init(
        {
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        type: { type: DataTypes.STRING, allowNull: false },
        ip: { type: DataTypes.STRING, allowNull: false },
        hostname: { type: DataTypes.STRING, allowNull: false },
        os: { type: DataTypes.STRING, allowNull: false },
        os_version: { type: DataTypes.STRING, allowNull: false },
        },
        { sequelize, tableName: "equipment" }
    );

    // Initialize the InfraEvent model
    InfraEvent.init(
        {
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        origin: { type: DataTypes.STRING, allowNull: false },
        eventid: { type: DataTypes.STRING, allowNull: false, unique: true },
        equipmentId: { type: DataTypes.BIGINT, allowNull: true }, // Foreign key to Equipment, allow null only for testing
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
    InfraEvent.belongsTo(Equipment, { foreignKey: { name: "equipmentId", allowNull: true }, as: "equipment" });
    Equipment.hasMany(InfraEvent, { foreignKey: "equipmentId", as: "infraEvents" });

    // Set up Umzug for migrations
    const umzug = new Umzug({
      migrations: {
        glob: "src/migrations/*.js", // Adjust the path to your migrations folder
      },
      context: sequelize.getQueryInterface(),
      storage: new SequelizeStorage({ sequelize }),
      logger: console,
    });

    // Run migrations
    await umzug.up();

    // Sync the models with the database
    await sequelize.sync();

  });

  afterAll(async () => {
    await sequelize.close();
  });

  beforeEach(async () => {
    // Clear the InfraEvent table before each test
    await InfraEvent.destroy({ where: {} });
  });

  test("should create an InfraEvent", async () => {
    const infraEventData = {
      origin: "Zabbix",
      eventid: "12345",
      equipmentId: undefined,
      description: "CPU usage high",
      status: "Active",
      acknowledged: false,
      severity: "High",
      timestamp: new Date(),
      detail: "CPU usage exceeded 90% for more than 5 minutes.",
    } as Partial<InfraEvent>;

    const infraEvent = await createInfraEvent(infraEventData);
    expect(infraEvent).toBeDefined();
    if (infraEvent) {
      expect(infraEvent.origin).toBe("Zabbix");
    }
  });

  test("should fetch InfraEvent by ID", async () => {
    const infraEventData = {
      origin: "Zabbix",
      eventid: "12345",
      equipmentId: undefined,
      description: "CPU usage high",
      status: "Active",
      acknowledged: false,
      severity: "High",
      timestamp: new Date(),
      detail: "CPU usage exceeded 90% for more than 5 minutes.",
    } as Partial<InfraEvent>;

    const createdInfraEvent = await createInfraEvent(infraEventData);
    if (!createdInfraEvent) {
      throw new Error("Failed to create InfraEvent");
    }
    const fetchedInfraEvent = await getInfraEventById(createdInfraEvent.id!);

    expect(fetchedInfraEvent).toBeDefined();
    expect(fetchedInfraEvent?.origin).toBe("Zabbix");
  });

  test("should fetch InfraEvent by origin and event ID", async () => {
    const infraEventData = {
      origin: "Zabbix",
      eventid: "12345",
      equipmentId: undefined,
      description: "CPU usage high",
      status: "Active",
      acknowledged: false,
      severity: "High",
      timestamp: new Date(),
      detail: "CPU usage exceeded 90% for more than 5 minutes.",
    } as Partial<InfraEvent>;

    await createInfraEvent(infraEventData);

    const fetchedInfraEvent = await getInfraEventByOriginAndEventId("Zabbix", "12345");
    expect(fetchedInfraEvent).toBeDefined();
    expect(fetchedInfraEvent?.eventid).toBe("12345");
  });

  test("should fetch all InfraEvents by origin", async () => {
    await createInfraEvent({
      origin: "Zabbix",
      eventid: "12345",
      equipmentId: undefined,
      description: "CPU usage high",
      status: "Active",
      acknowledged: false,
      severity: "High",
      timestamp: new Date(),
      detail: "CPU usage exceeded 90% for more than 5 minutes.",
    }) as Partial<InfraEvent>;

    await createInfraEvent({
      origin: "Zabbix",
      eventid: "12346",
      equipmentId: undefined,
      description: "Memory usage high",
      status: "Active",
      acknowledged: false,
      severity: "Medium",
      timestamp: new Date(),
      detail: "Memory usage exceeded 80% for more than 10 minutes.",
    }) as Partial<InfraEvent>;

    const infraEvents = await getAllInfraEventsByOrigin("Zabbix");
    expect(infraEvents?.length).toBe(2);
  });

  test("should fetch all InfraEvents", async () => {
    await createInfraEvent({
      origin: "Zabbix",
      eventid: "12345",
      equipmentId: undefined,
      description: "CPU usage high",
      status: "Active",
      acknowledged: false,
      severity: "High",
      timestamp: new Date(),
      detail: "CPU usage exceeded 90% for more than 5 minutes.",
    }) as Partial<InfraEvent>;

    await createInfraEvent({
      origin: "Wazuh",
      eventid: "54321",
      equipmentId: undefined,
      description: "Unauthorized access detected",
      status: "Resolved",
      acknowledged: true,
      severity: "Critical",
      timestamp: new Date(),
      detail: "Unauthorized access attempt detected on server.",
    }) as Partial<InfraEvent>;

    const infraEvents = await getAllInfraEvents();
    expect(infraEvents.length).toBe(2);
  });

  test("should update an InfraEvent", async () => {
    const infraEventData = {
      origin: "Zabbix",
      eventid: "12345",
      equipmentId: undefined,
      description: "CPU usage high",
      status: "Active",
      acknowledged: false,
      severity: "High",
      timestamp: new Date(),
      detail: "CPU usage exceeded 90% for more than 5 minutes.",
    } as Partial<InfraEvent>;

    const createdInfraEvent = await createInfraEvent(infraEventData);

    const updatedData = { status: "Resolved" };
    if (!createdInfraEvent) {
      throw new Error("Failed to create InfraEvent");
    }
    const [updatedRows] = await updateInfraEvent(createdInfraEvent.id!, updatedData);

    expect(updatedRows).toBe(1);

    const updatedInfraEvent = await getInfraEventById(createdInfraEvent.id!);
    expect(updatedInfraEvent?.status).toBe("Resolved");
  });

  test("should delete an InfraEvent", async () => {
    const infraEventData = {
      origin: "Zabbix",
      eventid: "12345",
      equipmentId: undefined,
      description: "CPU usage high",
      status: "Active",
      acknowledged: false,
      severity: "High",
      timestamp: new Date(),
      detail: "CPU usage exceeded 90% for more than 5 minutes.",
    } as Partial<InfraEvent>;

    const createdInfraEvent = await createInfraEvent(infraEventData);

    if (!createdInfraEvent) {
      throw new Error("Failed to create InfraEvent");
    }
    const deletedRows = await deleteInfraEvent(createdInfraEvent.id!);
    expect(deletedRows).toBe(1);

    const fetchedInfraEvent = await getInfraEventById(createdInfraEvent.id!);
    expect(fetchedInfraEvent).toBeNull();
  });
});