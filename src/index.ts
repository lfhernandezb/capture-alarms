import "reflect-metadata";
import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import Routes from "./routes";
import { config } from "./config/config";
import { sequelize } from "./config/sequelize";
import { exec } from "child_process";


// global error handlers for uncaught exceptions and rejections
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  // Optionally exit the process or continue
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  // Optionally exit the process or continue
});

async function runMigrations() {
  return new Promise((resolve, reject) => {
    exec("npx sequelize-cli db:migrate", (error, stdout, stderr) => {
      if (error) {
        console.error("Migration error:", stderr);
        reject(error);
      } else {
        console.log("Migration output:", stdout);
        resolve(stdout);
      }
    });
  });
}

export default class Server {
  constructor(app: Application) {
    this.config(app);
    new Routes(app);
  }

  private async config(app: Application): Promise<void> {
    const corsOptions: CorsOptions = {
      origin: config.corsOrigin //"http://localhost:8081"
    };

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    try {
      await runMigrations();
      console.log("Migrations applied successfully.");
    
      // Start your application logic here
      console.log("Application started...");
    } catch (error) {
      console.error("Error applying migrations:", error);
      process.exit(1); // Exit the application if the database initialization fails
    }
  }
}