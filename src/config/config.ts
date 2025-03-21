import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

interface EnvConfig {
    dbUser: string;
    dbPassword: string;
    dbHost: string;
    dbName: string;
    dbPort: string;
    wazuhUser: string;
    wazuhPassword: string;
    wazuhUrl: string;
    listeningPort: number;
    listeningAddress: string;
    corsOrigin: string;
    timeout: number;
}


// console.log(":", process.env.DB_HOST);
// console.log(":", process.env.DB_PORT);

// Validate required env variables
const getConfig = (): EnvConfig => {
    if (!process.env.DB_USER) {
      throw new Error("Missing DB_USER in .env");
    }
    if (!process.env.DB_PASSWORD) {
      throw new Error("Missing DB_PASSWORD in .env");
    }
    if (!process.env.DB_HOST) {
        throw new Error("Missing DB_HOST in .env");
    }
    if (!process.env.DB_NAME) {
        throw new Error("Missing DB_NAME in .env");
    }
    if (!process.env.DB_PORT) {
        throw new Error("Missing DB_PORT in .env");
    }
        if (!process.env.WAZUH_USER) {
        throw new Error("Missing WAZUH_USER in .env");
    }
    if (!process.env.WAZUH_PASSWORD) {
        throw new Error("Missing WAZUH_PASSWORD in .env");
    }
    if (!process.env.WAZUH_URL) {
        throw new Error("Missing WAZUH_URL in .env");
    }

    return {
        dbUser: process.env.DB_USER,
        dbPassword: process.env.DB_PASSWORD,
        dbHost: process.env.DB_HOST,
        dbName: process.env.DB_NAME,
        dbPort: process.env.DB_PORT,
        wazuhUser: process.env.WAZUH_USER,
        wazuhPassword: process.env.WAZUH_PASSWORD,
        wazuhUrl: process.env.WAZUH_URL,
        listeningPort: parseInt(process.env.PORT ? process.env.PORT : "8080", 10),
        listeningAddress: process.env.LISTEN_ADDRESS ? process.env.LISTEN_ADDRESS : "localhost",
        corsOrigin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN : "http://localhost:8081",
        timeout: parseInt(process.env.TIMEOUT ? process.env.TIMEOUT : "4000", 10),
    };
  };


// module.exports = { config };
export const config = getConfig();
