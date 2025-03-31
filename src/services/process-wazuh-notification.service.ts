import { plainToInstance } from "class-transformer";
import { Notification } from '../model/wazuh/notification.model';
import { WazuhAnswer } from '../model/wazuh/wazuh-answer.model';
import { DataWin } from '../model/wazuh/data-win.model';
import { DataFw } from '../model/wazuh/data-fw.model';
import { DataPkg } from '../model/wazuh/data-pkg.model';
import { DataOffice365 } from '../model/wazuh/data-office365.model';
import { queryEventById } from './wazuh.service';
import { InfraEvent, Equipment, wazuSeverities } from "../model/infra-event.model";
import { createEquipment } from "../repositories/equipment.repository";
import { createInfraEvent } from "../repositories/infra-event.repository";

export async function processWazuhNotification(notification: Notification): Promise<Notification> {
  
  /*
  Se recibe algo de esta forma:
  {
  attachments: [
      {
      color: 'warning',
      pretext: 'WAZUH Alert',
      title: 'Suspicious URL access.',
      text: '127.0.0.1 - - [27/Mar/2025:17:39:38 -0300] "GET /server-status?auto HTTP/1.1" 200 1027 "-" "Zabbix 5.4.5"',
      fields: [Array],
      ts: '1743107979.1310746420'
      }
    ]
  }
  */
  try {
    console.log(notification);
    // iterate over fields array
    for (let i = 0; i < notification.attachments![0].fields!.length; i++) {
         // get the title and value of each field
         const title = notification.attachments![0].fields![i].title;
         const value = notification.attachments![0].fields![i].value;
         // add the key-value pair to the alert object 
         console.log(title + " : " + value);
    }
      // console.log(alert);
  
      // query Wazuh API
      const response = await queryEventById(notification.attachments![0].ts!);
      // const resp = await QueryWazuhService("1741206721.1499080785");
      const answer: WazuhAnswer = response.data;
      parseWazuhAnswer(answer);
  
      return notification;
      
  } catch (error) {
    console.error("Error processing Wazuh notification:", error);
    // Handle the error without crashing the app
    return notification; // Optionally return the notification or a default value

  }
}

export function parseKeyValueString<T>(input: string, clazz: { new (): T }): T {
    const obj = input
      .split(" ") // Split by space
      .map(pair => pair.split("=")) // Split each pair by '='
      .filter(([key, value]) => key && value !== undefined) // Ensure valid pairs
      .reduce((acc, [key, value]) => {
        acc[toCamelCase(key)] = value;
        return acc;
      }, {} as Record<string, string>);
  
    return Object.assign(new clazz() as object, obj) as T; // Assign properties to a new instance of clazz
}

function toCamelCase(input: string): string {
    return input.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

export async function parseWazuhAnswer(answer: WazuhAnswer): Promise<InfraEvent> {
    console.log("answer:");
    console.log(answer);

    const alert = plainToInstance(WazuhAnswer, JSON.parse(JSON.stringify(answer)), {
      excludeExtraneousValues: false,
    });

    // console.log("alert:");
    // console.log(alert);

    const source = alert.hits!.hits![0].source!;
    // console.log("source:");
    const agent = source.agent;
    // console.log("agent:");
    const data = source.data;
    //console.log(data);
    const rule = source.rule;
    //console.log("rule:");
    const fullLog = source.fullLog;
    //console.log("full_log:");

    console.log("rule.id:" + rule!.id);
    console.log("rule.description:" + rule!.description);
    console.log("rule.level:" + rule!.level);

    console.log("agent.id:" + agent!.id);
    console.log("agent.name:" + agent!.name);
    console.log("agent.ip:" + agent!.ip);
    console.log("agent.os:" + agent!.os);
    console.log("agent.status:" + agent!.status);
    console.log("agent.version:" + agent!.version);

    let infraEvent = {
      id: undefined,
      origin: "wazuh",
      eventid: source.id,
      equipment: undefined,
      description: rule!.description || "",
      status: "active",
      acknowledged: false,
      severity: wazuSeverities[rule!.level!]?.name || "",
      timestamp: new Date(source!.sourceTimestamp!),
      detail: JSON.stringify(source),
    } as unknown as InfraEvent;

    
    switch (rule!.id) {
        case "60115":
        case "92650":
        case "92657":
            // Windows alert
            const dataWin = plainToInstance(DataWin, JSON.parse(JSON.stringify(data)), {
              excludeExtraneousValues: false,
            });
            console.log(dataWin);
            infraEvent.equipment = {
                    id: undefined,
                    name: dataWin.win?.eventdata!.workstationName || "",
                    type: "PC",
                    ip: dataWin.win?.eventdata!.ipAddress || "",
                    hostname: dataWin.win?.eventdata!.workstationName || "",
                    os: "Windows",
                    os_version: "",
            } as unknown as Equipment;

            // console.log(infraEvent);
            // Save infraEvent to DB
            // await this.eventRepository.save(infraEvent);
            break;
        case "70021":
        case "70022":
            // FW alert denied/permited traffic
            const dataFw = plainToInstance(DataFw, JSON.parse(JSON.stringify(data)), {
              excludeExtraneousValues: false,
            });
            console.log(dataFw);
            infraEvent.equipment = {
                    id: undefined,
                    name: dataFw.deviceName,
                    type: dataFw.logType,
                    ip: "",
                    hostname: "",
                    os: "",
                    os_version: "",
            } as unknown as Equipment;
            // console.log(infraEvent);
            // Save infraEvent to DB
            // await this.eventRepository.save(infraEvent);
            break;
        case "2903":
            // Linux package
            const dataPkg = plainToInstance(DataPkg, JSON.parse(JSON.stringify(data)), {
              excludeExtraneousValues: false,
            });
            infraEvent.equipment = {
                  id: undefined,
                  name: agent?.name,
                  type: "Linux",
                  ip: agent?.ip,
                  hostname: agent?.name,
                  os: "",
                  os_version: "",
              } as unknown as Equipment;
          // console.log(infraEvent);
            // Save infraEvent to DB
            // await this.eventRepository.save(infraEvent);
            break;
        case "31151":
        case "1007":
        case "3333":
        case "31103":
        case "31510":
        case "594":
        case "750":
        case "31516":
              // related to servers, web servers, services, full_log
              console.log(fullLog);
              infraEvent.equipment = {
                    id: undefined,
                    name: agent?.name,
                    type: "",
                    ip: agent?.ip,
                    hostname: agent?.name,
                    os: "",
                    os_version: "",
                } as unknown as Equipment;
            // console.log(infraEvent);
            // Save infraEvent to DB
            // await this.eventRepository.save(infraEvent);
              break;
        case "91575":
            // office365
            const dataOffice365 = plainToInstance(DataOffice365, JSON.parse(JSON.stringify(data)), {
                        excludeExtraneousValues: false,
                    });
            console.log(dataOffice365);
            infraEvent.equipment = {
                  id: undefined,
                  name: "",
                  type: "",
                  ip: "",
                  hostname: "",
                  os: "",
                  os_version: "",
              } as unknown as Equipment;
          // console.log(infraEvent);
            // Save infraEvent to DB using sequelize
            // await this.eventRepository.save(infraEvent);            
            break;
        default:
            console.log("******* No match, rule.id: " + rule!.id);
            break;
    }

    console.log("infraEvent:");
    console.log(infraEvent);
    // Save the InfraEvent and Equipment to the database
    try {
      // Save Equipment first
      if (!infraEvent.equipment) {
          throw new Error("Equipment data is undefined");
      }
      const savedEquipment = await createEquipment(infraEvent.equipment);
      /*
      const equipment = await Equipment.upsert({
          id: infraEvent.equipment!.id,
          name: infraEvent.equipment!.name,
          type: infraEvent.equipment!.type,
          ip: infraEvent.equipment!.ip,
          hostname: infraEvent.equipment!.hostname,
          os: infraEvent.equipment!.os,
          os_version: infraEvent.equipment!.os_version,
      });
      */
      console.log("Equipment saved to database:", savedEquipment.toJSON());
      // Save InfraEvent
      infraEvent.equipmentId = savedEquipment.id; // Set the foreign key
      infraEvent.equipment = savedEquipment; // Set the equipment object
      // Save InfraEvent
      const savedInfraEvent = await createInfraEvent(infraEvent);
      /*
      const savedInfraEvent = await InfraEvent.create({
          id: infraEvent.id,
          origin: infraEvent.origin,
          eventid: infraEvent.eventid,
          equipmentId: infraEvent.equipment!.id, // Foreign key
          description: infraEvent.description,
          status: infraEvent.status,
          acknowledged: infraEvent.acknowledged,
          severity: infraEvent.severity,
          timestamp: infraEvent.timestamp,
          detail: infraEvent.detail,
      });
      */
      console.log("InfraEvent saved to database:", savedInfraEvent.toJSON());
      return savedInfraEvent;
    } catch (error) {
        console.error("Error saving InfraEvent to database:", error);
        throw error;
    }

}