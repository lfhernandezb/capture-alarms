import { plainToInstance } from "class-transformer";
import { Alert } from "../model/alert.model";
import { DataFw } from "../model/data-fw.model";
import { DataOffice365 } from "../model/data-office365.model";
import { Hits } from "../model/hits.model";
import { Response } from "../model/response.model";
import { Win } from "../model/win.model";
import { QueryWazuhService } from "./query-wazuh.service";
import { DataPkg } from "../model/data-pkg.model";

export async function doReceiveAlert (alert: Alert): Promise<Alert> {
  
  /*
  const pairsArray: string[] = alert.attachments[0].text.split(/\s+/);
  // Create a new Map
  let myMap = new Map<string, string>();

  // iterate over the array of pairs
  for (let i = 0; i < pairsArray.length; i++) {
    // split each pair into key and value
    const pair: string[] = pairsArray[i].split('=');
    const key: string = pair[0];
    const value: string = pair[1];

    // add the key-value pair to the alert object
    myMap.set(key, value);
  }
  console.log(myMap);
  */
  console.log(alert);
  // iterate over fields array
  for (let i = 0; i < alert.attachments![0].fields!.length; i++) {
       // get the title and value of each field
       const title = alert.attachments![0].fields![i].title;
       const value = alert.attachments![0].fields![i].value;
       // add the key-value pair to the alert object 
       console.log(title + " : " + value);
  }
    // console.log(alert);

    // query Wazuh API
    // const resp = await QueryWazuhService(alert.attachments[0].ts);
    const resp = await QueryWazuhService("1741206721.1499080785");
    // const response: Response = resp.data;
    // Deserialize response data into a User instance
    parseWazuhResponse(resp);

    return alert;
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

export function parseWazuhResponse(resp: Response) {
        // console.log("resp:");
    // console.log(resp);
    console.log("resp.data:");
    console.log(resp.hits);

    const source = resp.hits!.hits![0].source!;
    console.log("source:");
    const data = source.data;
    //console.log(data);
    const rule = source.rule;
    //console.log("rule:");
    const fullLog = source.fullLog;
    //console.log("full_log:");

    console.log("rule.id:" + rule!.id);
    console.log("rule.description:" + rule!.description);
    console.log("rule.level:" + rule!.level);

    switch (resp.hits!.hits![0].source!.rule!.id) {
        case "60115":
        case "92650":
            // Windows alert
            const win = plainToInstance(Win, JSON.parse(JSON.stringify(data)), {
              excludeExtraneousValues: false,
            });
            console.log(win);
            break;
        case "70021":
        case "70022":
            // FW alert denied/permited traffic
            const dataFw = plainToInstance(DataPkg, JSON.parse(JSON.stringify(data)), {
              excludeExtraneousValues: false,
            });
            console.log(dataFw);
            break;
        case "2903":
            // Linux package
            const dataPkg = plainToInstance(DataPkg, JSON.parse(JSON.stringify(data)), {
              excludeExtraneousValues: false,
            });
            break;
        case "31151":
        case "1007":
        case "3333":
        case "31103":
        case "31510":
              // related to servers, web servers, services, full_log
              console.log(fullLog);
              break;
        case "91575":
            // office365
            const dataOffice365 = plainToInstance(DataOffice365, JSON.parse(JSON.stringify(data)), {
                        excludeExtraneousValues: false,
                    });
            console.log(dataOffice365);
            break;
        default:
            break;
    }

}