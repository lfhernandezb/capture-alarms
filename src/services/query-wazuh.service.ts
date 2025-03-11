import axios from "axios";
import * as https from "https";
import { Bool, Match, Must, Query, Request } from "../model/request.model";
import { Response } from "../model/response.model";
import { customSerializer, defaultSerializer } from "../libs/customSerializer";
import { config } from "../config/config";

async function QueryWazuhService(alertId: string): Promise<any> {
  
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
  
  
    // console.log(customSerializer.serialize(request));
  
    // return;
    /*
    axios.interceptors.response.use((response) => {
        response.data = defaultSerializer.deserialize(response.data, Response);
        return response;
      });
    */
    // send an http request to the backend using axios
    return axios.post(config.wazuhUrl + "/wazuh-alerts-*/_search", customSerializer.serialize(request), {
        headers: {
            "Content-Type": "application/json"
        },
        auth: {
            username: config.wazuhUser,
            password: config.wazuhPassword
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
    });
  }
  
  export { QueryWazuhService };
  