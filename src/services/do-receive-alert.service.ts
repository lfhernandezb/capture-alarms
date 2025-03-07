import { Alert } from "../model/alert.model";
import { Response } from "../model/response.model";
import { QueryWazuhService } from "./query-wazuh.service";

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
  for (let i = 0; i < alert.attachments[0].fields.length; i++) {
       // get the title and value of each field
       const title: string = alert.attachments[0].fields[i].title;
       const value: string = alert.attachments[0].fields[i].value;
       // add the key-value pair to the alert object 
       console.log(title + " : " + value);
    }
    // console.log(alert);

    // query Wazuh API
    const response: Response = await QueryWazuhService(alert.attachments[0].ts);
    // Save alert to database

  return alert;
}