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
    zabbixUrl: string;
    zabbixToken: string;
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
    if (!process.env.LISTENING_PORT) {
        throw new Error("Missing LISTENING_PORT in .env");
    }
    if (!process.env.LISTENING_ADDRESS) {
        throw new Error("Missing LISTENING_ADDRESS in .env");
    }
    if (!process.env.CORS_ORIGIN) {
        throw new Error("Missing CORS_ORIGIN in .env");
    }
    if (!process.env.TIMEOUT) {
        throw new Error("Missing TIMEOUT in .env");
    }
    if (!process.env.ZABBIX_URL) {
        throw new Error("Missing ZABBIX_URL in .env");
    }
    if (!process.env.ZABBIX_TOKEN) {
        throw new Error("Missing ZABBIX_TOKEN in .env");
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
        listeningPort: parseInt(process.env.LISTENING_PORT ? process.env.LISTENING_PORT : "8080", 10),
        listeningAddress: process.env.LISTENING_ADDRESS ? process.env.LISTENING_ADDRESS : "localhost",
        corsOrigin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN : "http://localhost:8081",
        timeout: parseInt(process.env.TIMEOUT ? process.env.TIMEOUT : "4000", 10),
        zabbixUrl: process.env.ZABBIX_URL ? process.env.ZABBIX_URL : "http://localhost:8082",
        zabbixToken: process.env.ZABBIX_TOKEN ? process.env.ZABBIX_TOKEN : "Zabbix-Token",
    };
  };


// module.exports = { config };
export const config = getConfig();
