import { plainToInstance } from 'class-transformer';
import { customSerializer } from '../libs/customSerializer';
import { Alert } from '../model/alert.model';
import { doReceiveAlert, parseKeyValueString } from '../services/do-receive-alert.service';
import { DataFw } from '../model/data-fw.model';
import { Response } from '../model/response.model';	
import { Hits } from '../model/hits.model';
import { Hit } from '../model/hit.model';
import { isArray } from 'typescript-json-serializer/dist/helpers';

const alertStr70022 = `
{"took":49,"timed_out":false,"_shards":{"total":210,"successful":210,"skipped":0,"failed":0},"hits":{"total":{"value":1,"relation":"eq"},"max_score":14.295748,"hits":[{"_index":"wazuh-alerts-4.x-2025.03.10","_id":"YmKMgZUBVJrWq0tirj19","_score":14.295748,"_source":{"agent":{"name":"wazuh","id":"000"},"manager":{"name":"wazuh"},"data":{"date":"2025-03-10","dst_country_code":"CHL","timezone":"-03","ips_policy_id":"0","dst_ip":"152.231.98.219","sent_bytes":"0","duration":"0","src_ip":"89.248.163.73","protocol":"TCP","device_name":"XG310","log_type":"Firewall","application_risk":"0","src_country_code":"NLD","tran_dst_port":"0","recv_pkts":"0","appfilter_policy_id":"0","iap":"0","fw_rule_id":"0","log_id":"010202601001","sophos_fw_status_msg":"Deny","sent_pkts":"0","log_component":"Invalid Traffic","appresolvedby":"Signature","device_id":"C320ABF22YJBD56","hb_health":"No Heartbeat","log_subtype":"Denied","message":"Could not associate packet to any connection.","priority":"Information","src_port":"40845","policy_type":"0","tran_src_port":"0","recv_bytes":"0","th":"No Heartbeat","dst_port":"3345","name":"XG310","time":"16:33:55","device":"SFW"},"rule":{"firedtimes":29467,"mail":false,"level":5,"description":"Traffic Denied: from 89.248.163.73 to 152.231.98.219","groups":["sophos-fw"],"id":"70021"},"decoder":{"name":"sophos-fw"},"full_log":"device=\\"SFW\\" date=2025-03-10 time=16:33:55 timezone=\\"-03\\" device_name=\\"XG310\\" device_id=C320ABF22YJBD56 log_id=\\"010202601001\\" log_type=\\"Firewall\\" log_component=\\"Invalid Traffic\\" log_subtype=\\"Denied\\" status=\\"Deny\\" priority=Information duration=0 fw_rule_id=0 fw_rule_name=\\"\\" fw_rule_section=\\"\\" nat_rule_id=0 nat_rule_name=\\"\\" policy_type=0 sdwan_profile_id_request=0 sdwan_profile_name_request=\\"\\" sdwan_profile_id_reply=0 sdwan_profile_name_reply=\\"\\" gw_id_request=0 gw_name_request=\\"\\" gw_id_reply=0 gw_name_reply=\\"\\" sdwan_route_id_request=0 sdwan_route_name_request=\\"\\" sdwan_route_id_reply=0 sdwan_route_name_reply=\\"\\" user_name=\\"\\" user_gp=\\"\\" iap=0 ips_policy_id=0 appfilter_policy_id=0 application=\\"\\" application_risk=0 application_technology=\\"\\" application_category=\\"\\" vlan_id=\\"\\" ether_type=IPv4 (0x0800) bridge_name=\\"\\" bridge_display_name=\\"\\" in_interface=\\"\\" in_display_interface=\\"\\" out_interface=\\"\\" out_display_interface=\\"\\" src_mac= dst_mac= src_ip=89.248.163.73 src_country_code=NLD dst_ip=152.231.98.219 dst_country_code=CHL protocol=\\"TCP\\" src_port=40845 dst_port=3345 sent_pkts=0 recv_pkts=0 sent_bytes=0 recv_bytes=0 tran_src_ip= tran_src_port=0 tran_dst_ip= tran_dst_port=0 srczonetype=\\"\\" srczone=\\"\\" dstzonetype=\\"\\" dstzone=\\"\\" dir_disp=\\"\\" connid=\\"\\" vconnid=\\"\\" hb_health=\\"No Heartbeat\\" message=\\"Could not associate packet to any connection.\\" appresolvedby=\\"Signature\\" app_is_cloud=0 log_occurrence=1 flags=0","input":{"type":"log"},"@timestamp":"2025-03-10T19:33:55.036Z","location":"172.31.248.4","id":"1741635235.1349923869","timestamp":"2025-03-10T16:33:55.036-0300"}}]}}`;

const alertStr60115 = `
{"took":54,"timed_out":false,"_shards":{"total":210,"successful":210,"skipped":0,"failed":0},"hits":{"total":{"value":1,"relation":"eq"},"max_score":14.36368,"hits":[{"_index":"wazuh-alerts-4.x-2025.03.05","_id":"LTwCaJUBVJrWq0tiHKs9","_score":14.36368,"_source":{"agent":{"ip":"172.31.218.108","name":"Queule","id":"003"},"manager":{"name":"wazuh"},"data":{"win":{"eventdata":{"subjectLogonId":"0x3e7","targetUserName":"mcifuentes","subjectUserSid":"S-1-5-18","subjectDomainName":"ACANTOTEKNOS","targetSid":"S-1-5-21-3098228147-2963646162-4080038921-4209","subjectUserName":"QUEULE$"},"system":{"eventID":"4740","keywords":"0x8020000000000000","providerGuid":"{54849625-5478-4994-a5ba-3e3b0328c30d}","level":"0","channel":"Security","opcode":"0","message":"\\"A user account was locked out.\r\n\r\nSubject:\r\n\tSecurity ID:\t\tS-1-5-18\r\n\tAccount Name:\t\tQUEULE$\r\n\tAccount Domain:\t\tACANTOTEKNOS\r\n\tLogon ID:\t\t0x3E7\r\n\r\nAccount That Was Locked Out:\r\n\tSecurity ID:\t\tS-1-5-21-3098228147-2963646162-4080038921-4209\r\n\tAccount Name:\t\tmcifuentes\r\n\r\nAdditional Information:\r\n\tCaller Computer Name:\t\\"","version":"0","systemTime":"2025-03-05T20:32:00.963675900Z","eventRecordID":"70182846","threadID":"9748","computer":"Queule.acantoteknos.local","task":"13824","processID":"808","severityValue":"AUDIT_SUCCESS","providerName":"Microsoft-Windows-Security-Auditing"}}},"rule":{"mail":true,"level":9,"hipaa":["164.312.a.1"],"pci_dss":["11.4","8.1.6"],"tsc":["CC6.1","CC6.8","CC7.2","CC7.3"],"description":"User account locked out (multiple login errors).","groups":["windows","windows_security","authentication_failures"],"nist_800_53":["AC.7","SI.4"],"gdpr":["IV_35.7.d"],"firedtimes":3,"mitre":{"technique":["Brute Force","Account Access Removal"],"id":["T1110","T1531"],"tactic":["Credential Access","Impact"]},"id":"60115","gpg13":["7.5"]},"decoder":{"name":"windows_eventchannel"},"input":{"type":"log"},"@timestamp":"2025-03-05T20:32:01.971Z","location":"EventChannel","id":"1741206721.1499080785","timestamp":"2025-03-05T17:32:01.971-0300"}}]}}`;
/*
describe('doReceiveAlert', () => {
    
    test('Correct parsing of alert 70022', () => {
        const alert = customSerializer.deserializeObject<Response>(alertStr70022, Response);
        console.log(alertStr70022);
        // console.log(alertStr70022.replace(/\\\\"/g, '\\\\\\"'));
        // const alert = plainToInstance(Response, JSON.parse(alertStr70022));
        console.log(alert);
        let hits: Hits;
        let hitss: Hit[];

        if (Array.isArray(alert)) {
            console.log('isArray');
            hits = alert[0]!.hits!;
        } else {
            console.log('isNotArray');
            hits = alert!.hits!;
        }

        expect(hits).not.toBeNull();
        expect(hits.hits).not.toBeNull();
        expect(hits.hits).toHaveLength(1);
        expect(hits.hits![0]).not.toBeNull();
        expect(hits.hits![0].source).not.toBeNull();
        expect(hits.hits![0].source?.data).not.toBeNull();

        const dataFw = customSerializer.deserializeObject<DataFw>(hits.hits![0].source!.data!, DataFw);
        // const dataFw = parseKeyValueString(alert.hits.hits![0].source!.data, DataFw);
        // const dataFw = parseKeyValueString(hits.hits![0].source!.data!, DataFw);

        console.log(dataFw);
        expect(dataFw).not.toBeNull();
        expect(dataFw!.deviceName).toBe('"XG310"');
        expect(dataFw!.deviceId).toBe('C320ABF22YJBD56');
    });
});
*/