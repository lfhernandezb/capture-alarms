import { classToPlain, instanceToPlain } from "class-transformer";
import axios from "axios";
import * as https from "https";
import { PollRequest } from "../model/zabbix/zabbix-query.model";
import { config } from "../config/config";

async function queryAllEvents(): Promise<any> {
  
    // create a new Request object
    const request: PollRequest = {
        jsonrpc: "2.0",
        method: "problem.get",
        id: 1,
        params: {
            output: ["eventid", "source", "objectid", "acknowledged"],
            acknowledged: undefined,
            selectAcknowledges: undefined,
            selectTags: undefined,
            selectSuppressionData: undefined,
            recent: "true", // true - return PROBLEM and recently RESOLVED problems (depends on Display OK triggers for N seconds) Default: false - UNRESOLVED problems only
            sortfield: ["eventid"],
            sortorder: "DESC"              
        },
    };

    console.log(instanceToPlain(request, ));

    // send an http request to the backend using axios
    return axios.post(config.zabbixUrl, instanceToPlain(request, ), {
        timeout: config.timeout,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${config.zabbixToken}`
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
    });
}

async function queryEventById(id: number): Promise<any> {
  
    // create a new Request object
    const request: PollRequest = {
        jsonrpc: "2.0",
        method: "event.get",
        id: 1,
        params: {
            output: "extend",
            selectAcknowledges: "extend",
            selectTags: "extend",
            selectSuppressionData: "extend",
            eventids: id.toString()
        },
    };

    console.log(instanceToPlain(request, ));

    // send an http request to the backend using axios
    return axios.post(config.zabbixUrl, instanceToPlain(request, ), {
        timeout: config.timeout,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${config.zabbixToken}`
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
    });
}

async function queryHostByTriggerId(id: string): Promise<any> {
  
    // create a new Request object
    const request: PollRequest = {
        jsonrpc: "2.0",
        method: "host.get",
        id: 2,
        params: {
            triggerids: [ id ]
        },
    };

    // console.log(instanceToPlain(request, ));

    // send an http request to the backend using axios
    return axios.post(config.zabbixUrl, instanceToPlain(request, ), {
        timeout: config.timeout,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${config.zabbixToken}`
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
    });
}

export { queryAllEvents, queryEventById, queryHostByTriggerId };
  