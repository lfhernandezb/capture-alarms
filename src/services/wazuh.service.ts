import { classToPlain, instanceToPlain } from "class-transformer";
import axios from "axios";
import * as https from "https";
import { config } from "../config/config";
import { WazuhQuery } from "../model/wazuh/wazuh-query.model";

async function queryEventById(eventId: string): Promise<any> {
    /*
    // create a new Match object
    const match: Match = new Match();
    match.setId(alertId);

    // create a new Must object
    const must: Must = new Must();
    must.setMatch(match);

    // create a new Bool object
    const bool: Bool = new Bool();
    bool.getMust().push(must);

    // console.log(bool);

    // create a new Query object
    const query: Query = new Query();
    query.setBool(bool);
    
    // console.log(customSerializer.serialize(bool));

    // console.log(customSerializer.serialize(query));

    // create a new Request object
    const request: Request = new Request();
    request.setQuery(query);
    */
    
    const wazuQuery: WazuhQuery = {
        query: {
            bool: {
                must: [
                    {
                        match: {
                            id: eventId
                        }
                    }
                ]
                
            }
        }
    };
 
    // send an http request to the backend using axios
    return axios.get(config.wazuhUrl, {
        timeout: config.timeout,
        headers: {
            "Content-Type": "application/json"
        },
        auth: {
            username: config.wazuhUser,
            password: config.wazuhPassword
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        data: instanceToPlain(wazuQuery, ) // data in body
    });
  }
  
  export { queryEventById };
  