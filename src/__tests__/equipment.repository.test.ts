import { Sequelize, DataTypes } from "sequelize";
import { Equipment } from "../model/infra-event.model";
import {
  getEquipmentById,
  getAllEquipment,
  createEquipment,
  updateEquipment,
  deleteEquipment,
  getEquipmentByName,
} from "../repositories/equipment.repository";
import { SequelizeStorage, Umzug } from "umzug";

describe("Equipment Repository", () => {
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
    // Clear the Equipment table before each test
    await Equipment.destroy({ where: {} });
  });

  test("should create equipment", async () => {
    const equipmentData = {
      name: "Server 1",
      type: "Server",
      ip: "192.168.1.1",
      hostname: "server1.local",
      os: "Linux",
      os_version: "Ubuntu 20.04",
    } as Partial<Equipment>;

    const equipment = await createEquipment(equipmentData);
    if (!equipment) {
      throw new Error("Failed to create equipment");
    }
    expect(equipment.name).toBe("Server 1");
  });

  test("should fetch equipment by ID", async () => {
    const equipmentData = {
      name: "Server 1",
      type: "Server",
      ip: "192.168.1.1",
      hostname: "server1.local",
      os: "Linux",
      os_version: "Ubuntu 20.04",
    };

    const createdEquipment = await createEquipment(equipmentData);
    if (!createdEquipment) {
      throw new Error("Failed to create equipment");
    }
    const fetchedEquipment = await getEquipmentById(createdEquipment.id!);

    expect(fetchedEquipment).toBeDefined();
    expect(fetchedEquipment?.name).toBe("Server 1");
  });

  test("should fetch all equipment", async () => {
    await createEquipment({
      name: "Server 1",
      type: "Server",
      ip: "192.168.1.1",
      hostname: "server1.local",
      os: "Linux",
      os_version: "Ubuntu 20.04",
    });

    await createEquipment({
      name: "Server 2",
      type: "Server",
      ip: "192.168.1.2",
      hostname: "server2.local",
      os: "Windows",
      os_version: "Windows Server 2019",
    });

    const equipmentList = await getAllEquipment();
    expect(equipmentList.length).toBe(2);
  });

  test("should update equipment", async () => {
    const equipmentData = {
      name: "Server 1",
      type: "Server",
      ip: "192.168.1.1",
      hostname: "server1.local",
      os: "Linux",
      os_version: "Ubuntu 20.04",
    };

    const createdEquipment = await createEquipment(equipmentData);
    if (!createdEquipment) {
      throw new Error("Failed to create equipment");
    }

    console.log("Created Equipment:", createdEquipment);

    const updatedData = { name: "Updated Server 1" };
    const [updatedRows] = await updateEquipment(createdEquipment.id!, updatedData);

    console.log("Updated Rows:", updatedRows);

    expect(updatedRows).toBe(1);

    const updatedEquipment = await getEquipmentById(createdEquipment.id!);
    expect(updatedEquipment?.name).toBe("Updated Server 1");

  });

  test("should delete equipment", async () => {
    const equipmentData = {
      name: "Server 1",
      type: "Server",
      ip: "192.168.1.1",
      hostname: "server1.local",
      os: "Linux",
      os_version: "Ubuntu 20.04",
    };

    const createdEquipment = await createEquipment(equipmentData);

    if (!createdEquipment) {
      throw new Error("Failed to create equipment");
    }
    const deletedRows = await deleteEquipment(createdEquipment.id!);
    expect(deletedRows).toBe(1);

    const fetchedEquipment = await getEquipmentById(createdEquipment.id!);
    expect(fetchedEquipment).toBeNull();
  });

  test("should fetch equipment by name", async () => {
    const equipmentData = {
      name: "Server 1",
      type: "Server",
      ip: "192.168.1.1",
      hostname: "server1.local",
      os: "Linux",
      os_version: "Ubuntu 20.04",
    };

    await createEquipment(equipmentData);

    const fetchedEquipment = await getEquipmentByName("Server 1");
    expect(fetchedEquipment).toBeDefined();
    expect(fetchedEquipment?.name).toBe("Server 1");
  });
});