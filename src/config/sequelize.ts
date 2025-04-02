import { Sequelize } from "sequelize";
import { config } from "./config";

// Initialize Sequelize for a local SQLite database
const sequelize = config.nodeEnv === "development"
  ? new Sequelize({
    dialect: (config.dbDialect as "sqlite" | "postgres" | "mysql" | "mariadb" | "mssql") || "sqlite",
    storage: config.dbStorage || "./database.sqlite", // Path to the SQLite database file
    logging: true, // Disable logging (optional)
  })
  : new Sequelize(
    process.env.DB_DATABASE || "",
    process.env.DB_USERNAME || "",
    process.env.DB_PASSWORD || "",
    {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
      dialect: "postgres",
      logging: false, // Disable logging in production
    }
  );

// Test the database connection
sequelize.authenticate()
    .then(() => {
        console.log("Database connection has been established successfully.");
    })
    .catch((error) => {
        console.error("Unable to connect to the database:", error);
    });

export { sequelize };