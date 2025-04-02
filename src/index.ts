import "reflect-metadata";
import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import Routes from "./routes";
import { config } from "./config/config";
import { sequelize } from "./config/sequelize";
import { Umzug, SequelizeStorage } from "umzug";
import { Equipment, InfraEvent } from "./model/infra-event.model";
import { DataTypes } from "sequelize";

// global error handlers for uncaught exceptions and rejections
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

async function runMigrations() {

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
      equipmentId: { type: DataTypes.BIGINT, allowNull: false }, // Foreign key to Equipment, allow null only for testing
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
  InfraEvent.belongsTo(Equipment, { foreignKey: { name: "equipmentId", allowNull: false }, as: "equipment" });
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

  // Run all pending migrations
  await umzug.up();
  console.log("Migrations applied successfully.");

    // Sync the models with the database
    await sequelize.sync();

}

export default class Server {
  constructor(app: Application) {
    this.config(app);
    new Routes(app);
  }

  private async config(app: Application): Promise<void> {
    const corsOptions: CorsOptions = {
      origin: config.corsOrigin,
    };

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    try {
      // Run migrations using Umzug
      await runMigrations();

      // Start your application logic here
      console.log("Application started...");
    } catch (error) {
      console.error("Error applying migrations:", error);
      process.exit(1); // Exit the application if the database initialization fails
    }
  }
}