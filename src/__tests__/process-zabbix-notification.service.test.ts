import "reflect-metadata";
import { plainToInstance } from "class-transformer";
import { ZabbixAnswer } from "../model/zabbix/zabbix-answer.model";

describe('parseZabbixAnswer', () => {
    
    test('Correct parsing of alert', () => {
        const alertStr = `
{"jsonrpc":"2.0","result":[{"eventid":"4951","source":"0","object":"0","objectid":"23487","clock":"1708007929","value":"1","acknowledged":"0","ns":"420107773","name":"Windows: Zabbix agent is not available (for 3m)","severity":"3","r_eventid":"0","c_eventid":"0","correlationid":"0","userid":"0","cause_eventid":"0","opdata":"","suppression_data":[],"suppressed":"0","urls":[],"tags":[{"tag":"scope","value":"availability"},{"tag":"component","value":"system"},{"tag":"H","value":"7x24"},{"tag":"I","value":"Bajo"},{"tag":"C","value":"Cliente C"},{"tag":"class","value":"os"},{"tag":"target","value":"windows"},{"tag":"glpi_ticket","value":"541"},{"tag":"glpi_ticketlink","value":"http://itsm_glpi.acantoteknos.local/front/ticket.form.php?id=541"}]}],"id":1}`;
                // const alert = customSerializer.deserializeObject<Response>(alertStr70022, Response);
        console.log(alertStr);
        const alert = plainToInstance(ZabbixAnswer, JSON.parse(alertStr), {
                excludeExtraneousValues: false,
              });
        
        // console.log(alertStr70022.replace(/\\\"/g, '\\\\"'));
        // const alert = plainToInstance(Response, JSON.parse(alertStr70022));
        console.log(alert);
        expect(alert).not.toBeNull();
        expect(alert.jsonrpc).toBe("2.0");
        expect(alert.result).not.toBeNull();
        expect(alert.result).toHaveLength(1);
        expect(alert.result![0].eventid).toBe("4951");
        expect(alert.result![0].source).toBe("0");
        expect(alert.result![0].object).toBe("0");
        expect(alert.result![0].objectid).toBe("23487");
        expect(alert.result![0].clock).toBe("1708007929");
        expect(alert.result![0].value).toBe("1");
        expect(alert.result![0].acknowledged).toBe("0");
        expect(alert.result![0].ns).toBe("420107773");
        expect(alert.result![0].name).toBe("Windows: Zabbix agent is not available (for 3m)");
        expect(alert.result![0].severity).toBe("3");
        expect(alert.result![0].r_eventid).toBe("0");
        expect(alert.result![0].c_eventid).toBe("0");
        expect(alert.result![0].correlationid).toBe("0");
        expect(alert.result![0].userid).toBe("0");
        expect(alert.result![0].cause_eventid).toBe("0");
        expect(alert.result![0].opdata).toBe("");
        expect(alert.result![0].suppression_data).not.toBeNull();
        expect(alert.result![0].suppression_data).toHaveLength(0);
        expect(alert.result![0].suppressed).toBe("0");
        expect(alert.result![0].urls).not.toBeNull();
        expect(alert.result![0].urls).toHaveLength(0);
        expect(alert.result![0].tags).not.toBeNull();
        expect(alert.result![0].tags).toHaveLength(9);
        expect(alert.result![0].tags![0].tag).toBe("scope");
        expect(alert.result![0].tags![0].value).toBe("availability");
        expect(alert.result![0].tags![1].tag).toBe("component");
        expect(alert.result![0].tags![1].value).toBe("system");
        expect(alert.result![0].tags![2].tag).toBe("H");
        expect(alert.result![0].tags![2].value).toBe("7x24");
        expect(alert.result![0].tags![3].tag).toBe("I");
        expect(alert.result![0].tags![3].value).toBe("Bajo");
        expect(alert.result![0].tags![4].tag).toBe("C");
        expect(alert.result![0].tags![4].value).toBe("Cliente C");
        expect(alert.result![0].tags![5].tag).toBe("class");
        expect(alert.result![0].tags![5].value).toBe("os");
        expect(alert.result![0].tags![6].tag).toBe("target");
        expect(alert.result![0].tags![6].value).toBe("windows");
        expect(alert.result![0].tags![7].tag).toBe("glpi_ticket");
        expect(alert.result![0].tags![7].value).toBe("541");
        expect(alert.result![0].tags![8].tag).toBe("glpi_ticketlink");
        expect(alert.result![0].tags![8].value).toBe("http://itsm_glpi.acantoteknos.local/front/ticket.form.php?id=541");

        // const dataFw = customSerializer.deserializeObject<DataFw>(hits.hits![0].source!.data!, DataFw);
        // const dataFw = parseKeyValueString(alert.hits.hits![0].source!.data, DataFw);
        // const dataFw = parseKeyValueString(hits.hits![0].source!.data!, DataFw);
        console.log("alert.result[0].eventid: \\n" + alert.result![0].eventid)

        console.log("alert.result[0].name: \\n" + alert.result![0].name)
        
        console.log("alert.result[0].tags[0].value: \\n" + alert.result![0].tags![0].value)

    
    })});