import { plainToInstance } from 'class-transformer';
import { DataFw } from '../model/data-fw.model';
import { Response } from '../model/response.model';	
import { Hits } from '../model/hits.model';
import { Hit } from '../model/hit.model';
import { Win } from '../model/win.model';
import { DataWin } from '../model/data-win.model';
import { DataPkg } from '../model/data-pkg.model';
import { DataWebSrv } from '../model/data-web-srv.model';
import { DataOffice365 } from '../model/data-office365.model';

describe('doReceiveAlert', () => {
    
    test('Correct parsing of alert 70022', () => {
        const alertStr = `
{"took":49,"timed_out":false,"_shards":{"total":210,"successful":210,"skipped":0,"failed":0},"hits":{"total":{"value":1,"relation":"eq"},"max_score":14.295748,"hits":[{"_index":"wazuh-alerts-4.x-2025.03.10","_id":"YmKMgZUBVJrWq0tirj19","_score":14.295748,"_source":{"agent":{"name":"wazuh","id":"000"},"manager":{"name":"wazuh"},"data":{"date":"2025-03-10","dst_country_code":"CHL","timezone":"-03","ips_policy_id":"0","dst_ip":"152.231.98.219","sent_bytes":"0","duration":"0","src_ip":"89.248.163.73","protocol":"TCP","device_name":"XG310","log_type":"Firewall","application_risk":"0","src_country_code":"NLD","tran_dst_port":"0","recv_pkts":"0","appfilter_policy_id":"0","iap":"0","fw_rule_id":"0","log_id":"010202601001","sophos_fw_status_msg":"Deny","sent_pkts":"0","log_component":"Invalid Traffic","appresolvedby":"Signature","device_id":"C320ABF22YJBD56","hb_health":"No Heartbeat","log_subtype":"Denied","message":"Could not associate packet to any connection.","priority":"Information","src_port":"40845","policy_type":"0","tran_src_port":"0","recv_bytes":"0","th":"No Heartbeat","dst_port":"3345","name":"XG310","time":"16:33:55","device":"SFW"},"rule":{"firedtimes":29467,"mail":false,"level":5,"description":"Traffic Denied: from 89.248.163.73 to 152.231.98.219","groups":["sophos-fw"],"id":"70021"},"decoder":{"name":"sophos-fw"},"full_log":"device=\\"SFW\\" date=2025-03-10 time=16:33:55 timezone=\\"-03\\" device_name=\\"XG310\\" device_id=C320ABF22YJBD56 log_id=\\"010202601001\\" log_type=\\"Firewall\\" log_component=\\"Invalid Traffic\\" log_subtype=\\"Denied\\" status=\\"Deny\\" priority=Information duration=0 fw_rule_id=0 fw_rule_name=\\"\\" fw_rule_section=\\"\\" nat_rule_id=0 nat_rule_name=\\"\\" policy_type=0 sdwan_profile_id_request=0 sdwan_profile_name_request=\\"\\" sdwan_profile_id_reply=0 sdwan_profile_name_reply=\\"\\" gw_id_request=0 gw_name_request=\\"\\" gw_id_reply=0 gw_name_reply=\\"\\" sdwan_route_id_request=0 sdwan_route_name_request=\\"\\" sdwan_route_id_reply=0 sdwan_route_name_reply=\\"\\" user_name=\\"\\" user_gp=\\"\\" iap=0 ips_policy_id=0 appfilter_policy_id=0 application=\\"\\" application_risk=0 application_technology=\\"\\" application_category=\\"\\" vlan_id=\\"\\" ether_type=IPv4 (0x0800) bridge_name=\\"\\" bridge_display_name=\\"\\" in_interface=\\"\\" in_display_interface=\\"\\" out_interface=\\"\\" out_display_interface=\\"\\" src_mac= dst_mac= src_ip=89.248.163.73 src_country_code=NLD dst_ip=152.231.98.219 dst_country_code=CHL protocol=\\"TCP\\" src_port=40845 dst_port=3345 sent_pkts=0 recv_pkts=0 sent_bytes=0 recv_bytes=0 tran_src_ip= tran_src_port=0 tran_dst_ip= tran_dst_port=0 srczonetype=\\"\\" srczone=\\"\\" dstzonetype=\\"\\" dstzone=\\"\\" dir_disp=\\"\\" connid=\\"\\" vconnid=\\"\\" hb_health=\\"No Heartbeat\\" message=\\"Could not associate packet to any connection.\\" appresolvedby=\\"Signature\\" app_is_cloud=0 log_occurrence=1 flags=0","input":{"type":"log"},"@timestamp":"2025-03-10T19:33:55.036Z","location":"172.31.248.4","id":"1741635235.1349923869","timestamp":"2025-03-10T16:33:55.036-0300"}}]}}`;
                // const alert = customSerializer.deserializeObject<Response>(alertStr70022, Response);
        console.log(alertStr);
        const alert = plainToInstance(Response, JSON.parse(alertStr), {
                excludeExtraneousValues: false,
              });
        
        // console.log(alertStr70022.replace(/\\\"/g, '\\\\"'));
        // const alert = plainToInstance(Response, JSON.parse(alertStr70022));
        console.log(alert);
        expect(alert).not.toBeNull();
        expect(alert!.took).toBe(49);
        expect(alert!.timedOut).toBe(false);
        expect(alert!.shards).not.toBeNull();
        expect(alert!.shards!.total).toBe(210);
        expect(alert!.shards!.successful).toBe(210);
        expect(alert!.shards!.skipped).toBe(0);
        expect(alert!.shards!.failed).toBe(0);
        expect(alert!.hits).not.toBeNull();
        expect(alert!.hits!.total).not.toBeNull();
        expect(alert!.hits!.total!.value).toBe(1);
        expect(alert!.hits!.total!.relation).toBe("eq");
        expect(alert!.hits!.maxScore).toBe(14.295748);
        expect(alert!.hits!.hits).not.toBeNull();
        expect(alert!.hits!.hits).toHaveLength(1);
        expect(alert!.hits!.hits![0]).not.toBeNull();
        expect(alert!.hits!.hits![0].source).not.toBeNull();
        expect(alert!.hits!.hits![0].source?.data).not.toBeNull();

        // const dataFw = customSerializer.deserializeObject<DataFw>(hits.hits![0].source!.data!, DataFw);
        // const dataFw = parseKeyValueString(alert.hits.hits![0].source!.data, DataFw);
        // const dataFw = parseKeyValueString(hits.hits![0].source!.data!, DataFw);
        console.log("hits[0]: \\n" + JSON.stringify(alert!.hits!.hits![0].source))

        console.log("source: \\n" + JSON.stringify(alert!.hits!.hits![0].source))
        
        console.log("data: \\n" + JSON.stringify(alert!.hits!.hits![0].source!.data))

        const dataFw = plainToInstance(DataFw, JSON.parse(JSON.stringify(alert!.hits!.hits![0].source!.data!)), {
            excludeExtraneousValues: false,
          });

        console.log(dataFw);
        expect(dataFw).not.toBeNull();
        expect(dataFw!.deviceName).toBe('XG310');
        expect(dataFw!.deviceId).toBe('C320ABF22YJBD56');
    });

    test('Correct parsing of alert 60115', () => {
        const alertStr = `
{"took":54,"timed_out":false,"_shards":{"total":210,"successful":210,"skipped":0,"failed":0},"hits":{"total":{"value":1,"relation":"eq"},"max_score":14.36368,"hits":[{"_index":"wazuh-alerts-4.x-2025.03.05","_id":"LTwCaJUBVJrWq0tiHKs9","_score":14.36368,"_source":{"agent":{"ip":"172.31.218.108","name":"Queule","id":"003"},"manager":{"name":"wazuh"},"data":{"win":{"eventdata":{"subjectLogonId":"0x3e7","targetUserName":"mcifuentes","subjectUserSid":"S-1-5-18","subjectDomainName":"ACANTOTEKNOS","targetSid":"S-1-5-21-3098228147-2963646162-4080038921-4209","subjectUserName":"QUEULE$"},"system":{"eventID":"4740","keywords":"0x8020000000000000","providerGuid":"{54849625-5478-4994-a5ba-3e3b0328c30d}","level":"0","channel":"Security","opcode":"0","message":"\\"A user account was locked out.\\r\\n\\r\\nSubject:\\r\\n\\tSecurity ID:\\t\\tS-1-5-18\\r\\n\\tAccount Name:\\t\\tQUEULE$\\r\\n\\tAccount Domain:\\t\\tACANTOTEKNOS\\r\\n\\tLogon ID:\\t\\t0x3E7\\r\\n\\r\\nAccount That Was Locked Out:\\r\\n\\tSecurity ID:\\t\\tS-1-5-21-3098228147-2963646162-4080038921-4209\\r\\n\\tAccount Name:\\t\\tmcifuentes\\r\\n\\r\\nAdditional Information:\\r\\n\\tCaller Computer Name:\\t\\"","version":"0","systemTime":"2025-03-05T20:32:00.963675900Z","eventRecordID":"70182846","threadID":"9748","computer":"Queule.acantoteknos.local","task":"13824","processID":"808","severityValue":"AUDIT_SUCCESS","providerName":"Microsoft-Windows-Security-Auditing"}}},"rule":{"mail":true,"level":9,"hipaa":["164.312.a.1"],"pci_dss":["11.4","8.1.6"],"tsc":["CC6.1","CC6.8","CC7.2","CC7.3"],"description":"User account locked out (multiple login errors).","groups":["windows","windows_security","authentication_failures"],"nist_800_53":["AC.7","SI.4"],"gdpr":["IV_35.7.d"],"firedtimes":3,"mitre":{"technique":["Brute Force","Account Access Removal"],"id":["T1110","T1531"],"tactic":["Credential Access","Impact"]},"id":"60115","gpg13":["7.5"]},"decoder":{"name":"windows_eventchannel"},"input":{"type":"log"},"@timestamp":"2025-03-05T20:32:01.971Z","location":"EventChannel","id":"1741206721.1499080785","timestamp":"2025-03-05T17:32:01.971-0300"}}]}}`;

        // const alert = customSerializer.deserializeObject<Response>(alertStr70022, Response);
        console.log(alertStr);
        const alert = plainToInstance(Response, JSON.parse(alertStr), {
                excludeExtraneousValues: false,
              });
        
        // console.log(alertStr70022.replace(/\\\"/g, '\\\\"'));
        // const alert = plainToInstance(Response, JSON.parse(alertStr70022));
        console.log(alert);
        expect(alert).not.toBeNull();
        expect(alert!.took).toBe(54);
        expect(alert!.timedOut).toBe(false);
        expect(alert!.shards).not.toBeNull();
        expect(alert!.shards!.total).toBe(210);
        expect(alert!.shards!.successful).toBe(210);
        expect(alert!.shards!.skipped).toBe(0);
        expect(alert!.shards!.failed).toBe(0);
        expect(alert!.hits).not.toBeNull();
        expect(alert!.hits!.total).not.toBeNull();
        expect(alert!.hits!.total!.value).toBe(1);
        expect(alert!.hits!.total!.relation).toBe("eq");
        expect(alert!.hits!.maxScore).toBe(14.36368);
        expect(alert!.hits!.hits).not.toBeNull();
        expect(alert!.hits!.hits).toHaveLength(1);
        expect(alert!.hits!.hits![0]).not.toBeNull();
        expect(alert!.hits!.hits![0].source).not.toBeNull();
        expect(alert!.hits!.hits![0].source?.data).not.toBeNull();

        // const dataFw = customSerializer.deserializeObject<DataFw>(hits.hits![0].source!.data!, DataFw);
        // const dataFw = parseKeyValueString(alert.hits.hits![0].source!.data, DataFw);
        // const dataFw = parseKeyValueString(hits.hits![0].source!.data!, DataFw);
        console.log("hits[0]: \\n" + JSON.stringify(alert!.hits!.hits![0].source))

        console.log("source: \\n" + JSON.stringify(alert!.hits!.hits![0].source))
        
        console.log("data: \\n" + JSON.stringify(alert!.hits!.hits![0].source!.data))

        const dataWin = plainToInstance(DataWin, JSON.parse(JSON.stringify(alert!.hits!.hits![0].source!.data!)), {
            excludeExtraneousValues: false,
        });

        console.log(dataWin);
        expect(dataWin).not.toBeNull();
        console.log(dataWin.win);
        expect(dataWin.win).not.toBeNull();
        expect(dataWin.win!.eventdata).not.toBeNull();
        console.log("win.eventdata: \\n" + JSON.stringify(dataWin.win!.eventdata))
        expect(dataWin.win!.system).not.toBeNull();
        console.log("win.system: \\n" + JSON.stringify(dataWin.win!.system))
        expect(dataWin.win!.eventdata?.targetUserName).toBe('mcifuentes');
        expect(dataWin.win!.system?.channel).toBe('Security');
    });

    test('Correct parsing of alert 2903', () => {
        const alertStr = `
{"took":36,"timed_out":false,"_shards":{"total":213,"successful":213,"skipped":0,"failed":0},"hits":{"total":{"value":1,"relation":"eq"},"max_score":14.327152,"hits":[{"_index":"wazuh-alerts-4.x-2025.03.06","_id":"peDKapUBVJrWq0tiOaW4","_score":14.327152,"_source":{"agent":{"ip":"172.31.250.68","name":"ansible01","id":"023"},"manager":{"name":"wazuh"},"data":{"dpkg_status":"remove","package":"linux-tools-6.8.0-54","arch":"amd64","version":"6.8.0-54.56"},"rule":{"firedtimes":7,"mail":true,"level":7,"pci_dss":["10.6.1","10.2.7"],"hipaa":["164.312.b"],"tsc":["CC7.2","CC7.3","CC6.8","CC8.1"],"description":"Dpkg (Debian Package) removed.","groups":["syslog","dpkg","config_changed"],"id":"2903","nist_800_53":["AU.6","AU.14"],"gpg13":["4.10"],"gdpr":["IV_35.7.d"]},"decoder":{"name":"dpkg-decoder"},"full_log":"2025-03-06 06:29:51 remove linux-tools-6.8.0-54:amd64 6.8.0-54.56 <none>","input":{"type":"log"},"@timestamp":"2025-03-06T09:29:52.001Z","location":"/var/log/dpkg.log","id":"1741253392.3001933467","timestamp":"2025-03-06T06:29:52.001-0300"}}]}}`;

        // const alert = customSerializer.deserializeObject<Response>(alertStr70022, Response);
        console.log(alertStr);
        const alert = plainToInstance(Response, JSON.parse(alertStr), {
                excludeExtraneousValues: false,
              });
        
        // console.log(alertStr70022.replace(/\\\"/g, '\\\\"'));
        // const alert = plainToInstance(Response, JSON.parse(alertStr70022));
        console.log(alert);
        expect(alert).not.toBeNull();
        expect(alert!.took).toBe(36);
        expect(alert!.timedOut).toBe(false);
        expect(alert!.shards).not.toBeNull();
        expect(alert!.shards!.total).toBe(213);
        expect(alert!.shards!.successful).toBe(213);
        expect(alert!.shards!.skipped).toBe(0);
        expect(alert!.shards!.failed).toBe(0);
        expect(alert!.hits).not.toBeNull();
        expect(alert!.hits!.total).not.toBeNull();
        expect(alert!.hits!.total!.value).toBe(1);
        expect(alert!.hits!.total!.relation).toBe("eq");
        expect(alert!.hits!.maxScore).toBe(14.327152);
        expect(alert!.hits!.hits).not.toBeNull();
        expect(alert!.hits!.hits).toHaveLength(1);
        expect(alert!.hits!.hits![0]).not.toBeNull();
        expect(alert!.hits!.hits![0].source).not.toBeNull();
        expect(alert!.hits!.hits![0].source?.data).not.toBeNull();

        // const dataFw = customSerializer.deserializeObject<DataFw>(hits.hits![0].source!.data!, DataFw);
        // const dataFw = parseKeyValueString(alert.hits.hits![0].source!.data, DataFw);
        // const dataFw = parseKeyValueString(hits.hits![0].source!.data!, DataFw);
        console.log("hits[0]: \\n" + JSON.stringify(alert!.hits!.hits![0].source))

        console.log("source: \\n" + JSON.stringify(alert!.hits!.hits![0].source))
        
        console.log("data: \\n" + JSON.stringify(alert!.hits!.hits![0].source!.data))

        const dataPkg = plainToInstance(DataPkg, JSON.parse(JSON.stringify(alert!.hits!.hits![0].source!.data!)), {
            excludeExtraneousValues: false,
        });

        console.log(dataPkg);
        expect(dataPkg).not.toBeNull();
        expect(dataPkg!.package).toBe('linux-tools-6.8.0-54');
        expect(dataPkg!.version).toBe('6.8.0-54.56');
        expect(dataPkg!.arch).toBe('amd64');
        expect(dataPkg!.dpkgStatus).toBe('remove');
    });









    test('Correct parsing of alert 31151', () => {
        const alertStr = `
{"took":34,"timed_out":false,"_shards":{"total":213,"successful":213,"skipped":0,"failed":0},"hits":{"total":{"value":1,"relation":"eq"},"max_score":13.538,"hits":[{"_index":"wazuh-alerts-4.x-2025.03.12","_id":"kEpgiJUBVJrWq0tivjtP","_score":13.538,"_source":{"agent":{"ip":"172.31.218.44","name":"ruil","id":"002"},"data":{"protocol":"GET","srcip":"34.73.152.165","id":"404","url":"/.well-known/webauthn"},"rule":{"mail":true,"level":10,"hipaa":["164.312.b","164.312.b","164.312.b"],"pci_dss":["10.2.4","10.2.5","11.2.1","11.2.3","10.6.1","11.4","6.5","11.4","6.5.8","10.2.4","6.5","11.4"],"tsc":["CC6.1","CC6.8","CC7.2","CC7.3","CC7.1","CC7.2","CC6.1","CC6.8","CC7.3","CC6.6","CC7.1","CC8.1","CC6.1","CC6.8","CC7.2","CC7.","CC6.6","CC7.1","CC8.1","CC6.1","CC6.8","CC7.2","CC7.3"],"description":"Multiple web server 400 error codes from same source ip.","groups":["local","syslog","sshd","office365","attacks","windows","windows_security"," windows_system","authentication_failed","authentication_success","invalid_login"," fortigate","vulnerability-detector","audit_anom"," audit","gd","windows_application","invalid_access"," windows_applicationweb_scan","recon"],"nist_800_53":["AC.7","AU.14","AU.6","SI.4","SA.11","SI.4","AU.14","AC.7","SA.11","SI.4"],"frequency":14,"gdpr":["IV_32.2","IV_35.7.d","IV_30.1.g","IV_35.7.d"],"firedtimes":1,"mitre":{"technique":["Vulnerability Scanning"],"id":["T1595.002"],"tactic":["Reconnaissance"]},"id":"31151","gpg13":["7.1","4.14"]},"full_log":"34.73.152.165 - - [12/Mar/2025:00:23:13 -0300] \\"GET /.well-known/webauthn HTTP/1.1\\" 404 118443 \\"https://www.acanto.io/\\" \\"Mozilla/5.0 (Linux; Android 8.1.0; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Mobile Safari/537.36 PTST/250311.130034\\"","id":"1741749795.184033075","timestamp":"2025-03-12T00:23:15.607-0300","previous_output":"34.73.152.165 - - [12/Mar/2025:00:23:12 -0300] \\"GET /.well-known/related-website-set.json HTTP/1.1\\" 404 118783 \\"https://www.acanto.io/\\" \\"Mozilla/5.0 (Linux; Android 8.1.0; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Mobile Safari/537.36 PTST/250311.130034\\"\\n34.73.152.165 - - [12/Mar/2025:00:23:13 -0300] \\"GET /.well-known/passkey-endpoints HTTP/1.1\\" 404 118443 \\"https://www.acanto.io/\\" \\"Mozilla/5.0 (Linux; Android 8.1.0; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Mobile Safari/537.36 PTST/250311.130034\\"\\n34.73.152.165 - - [12/Mar/2025:00:23:12 -0300] \\"GET /.well-known/privacy-sandbox-attestations.json HTTP/1.1\\" 404 121740 \\"https://www.acanto.io/\\" \\"Mozilla/5.0 (Linux; Android 8.1.0; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Mobile Safari/537.36 PTST/250311.130034\\"\\n34.73.152.165 - - [12/Mar/2025:00:23:12 -0300] \\"GET /.well-known/web-identity HTTP/1.1\\" 404 121740 \\"https://www.acanto.io/\\" \\"Mozilla/5.0 (Linux; Android 8.1.0; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Mobile Safari/537.36 PTST/250311.130034\\"\\n34.73.152.165 - - [12/Mar/2025:00:23:12 -0300] \\"GET /.well-known/gpc.json HTTP/1.1\\" 404 121740 \\"https://www.acanto.io/\\" \\"Mozilla/5.0 (Linux; Android 8.1.0; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Mobile Safari/537.36 PTST/250311.130034\\"\\n34.73.152.165 - - [12/Mar/2025:00:23:12 -0300] \\"GET /.well-known/apple-app-site-association HTTP/1.1\\" 404 118783 \\"https://www.acanto.io/\\" \\"Mozilla/5.0 (Linux; Android 8.1.0; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Mobile Safari/537.36 PTST/250311.130034\\"\\n34.73.152.165 - - [12/Mar/2025:00:23:12 -0300] \\"GET /.well-known/assetlinks.json HTTP/1.1\\" 404 118443 \\"https://www.acanto.io/\\" \\"Mozilla/5.0 (Linux; Android 8.1.0; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Mobile Safari/537.36 PTST/250311.130034\\"\\n34.73.152.165 - - [12/Mar/2025:00:23:03 -0300] \\"GET /dsrdelete.json HTTP/1.1\\" 404 118783 \\"https://www.acanto.io/\\" \\"Mozilla/5.0 (Linux; Android 8.1.0; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Mobile Safari/537.36 PTST/250311.130034\\"\\n34.73.152.165 - - [12/Mar/2025:00:22:44 -0300] \\"GET /.well-known/apple-app-site-association HTTP/1.1\\" 404 118443 \\"https://www.acanto.io/\\" \\"Mozilla/5.0 (Linux; Android 8.1.0; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Mobile Safari/537.36 PTST/250311.130034\\"\\n34.73.152.165 - - [12/Mar/2025:00:22:44 -0300] \\"GET /.well-known/assetlinks.json HTTP/1.1\\" 404 118443 \\"https://www.acanto.io/\\" \\"Mozilla/5.0 (Linux; Android 8.1.0; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Mobile Safari/537.36 PTST/250311.130034\\"\\n34.73.152.165 - - [12/Mar/2025:00:22:40 -0300] \\"GET /app-ads.txt HTTP/1.1\\" 404 118783 \\"https://www.acanto.io/\\" \\"Mozilla/5.0 (Linux; Android 8.1.0; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Mobile Safari/537.36 PTST/250311.130034\\"","manager":{"name":"wazuh"},"decoder":{"name":"web-accesslog"},"input":{"type":"log"},"@timestamp":"2025-03-12T03:23:15.607Z","location":"/var/log/apache2/access.log","GeoLocation":{"country_name":"United States","region_name":"Virginia","location":{"lon":-77.2481,"lat":38.6583}}}}]}}`;

        // const alert = customSerializer.deserializeObject<Response>(alertStr70022, Response);
        console.log(alertStr);
        const alert = plainToInstance(Response, JSON.parse(alertStr), {
                excludeExtraneousValues: false,
              });
        
        // console.log(alertStr70022.replace(/\\\"/g, '\\\\"'));
        // const alert = plainToInstance(Response, JSON.parse(alertStr70022));
        console.log(alert);
        expect(alert).not.toBeNull();
        expect(alert!.took).toBe(34);
        expect(alert!.timedOut).toBe(false);
        expect(alert!.shards).not.toBeNull();
        expect(alert!.shards!.total).toBe(213);
        expect(alert!.shards!.successful).toBe(213);
        expect(alert!.shards!.skipped).toBe(0);
        expect(alert!.shards!.failed).toBe(0);
        expect(alert!.hits).not.toBeNull();
        expect(alert!.hits!.total).not.toBeNull();
        expect(alert!.hits!.total!.value).toBe(1);
        expect(alert!.hits!.total!.relation).toBe("eq");
        expect(alert!.hits!.maxScore).toBe(13.538);
        expect(alert!.hits!.hits).not.toBeNull();
        expect(alert!.hits!.hits).toHaveLength(1);
        expect(alert!.hits!.hits![0]).not.toBeNull();
        expect(alert!.hits!.hits![0].source).not.toBeNull();
        expect(alert!.hits!.hits![0].source?.data).not.toBeNull();

        // const dataFw = customSerializer.deserializeObject<DataFw>(hits.hits![0].source!.data!, DataFw);
        // const dataFw = parseKeyValueString(alert.hits.hits![0].source!.data, DataFw);
        // const dataFw = parseKeyValueString(hits.hits![0].source!.data!, DataFw);
        console.log("hits[0]: \\n" + JSON.stringify(alert!.hits!.hits![0].source))

        console.log("source: \\n" + JSON.stringify(alert!.hits!.hits![0].source))
        
        console.log("data: \\n" + JSON.stringify(alert!.hits!.hits![0].source!.data))

        console.log("fullLog: \\n" + JSON.stringify(alert!.hits!.hits![0].source!.fullLog))

        const dataWebSrv = plainToInstance(DataWebSrv, JSON.parse(JSON.stringify(alert!.hits!.hits![0].source!.data!)), {
            excludeExtraneousValues: false,
        });

        console.log(dataWebSrv);
        expect(dataWebSrv).not.toBeNull();
        expect(dataWebSrv.protocol).toBe('GET');
        expect(dataWebSrv.srcip).toBe('34.73.152.165');
        expect(dataWebSrv.url).toBe('/.well-known/webauthn');
        expect(dataWebSrv.id).toBe('404');
    });














    test('Correct parsing of alert 91575', () => {
        const alertStr = `
{"took":62,"timed_out":false,"_shards":{"total":213,"successful":213,"skipped":0,"failed":0},"hits":{"total":{"value":1,"relation":"eq"},"max_score":14.265003,"hits":[{"_index":"wazuh-alerts-4.x-2025.03.07","_id":"q8VocZUBVJrWq0tiD74y","_score":14.265003,"_source":{"agent":{"name":"wazuh","id":"000"},"manager":{"name":"wazuh"},"data":{"integration":"office365","office365":{"LastModifiedBy":"leandro.gonzalez@acanto.io","LastModifiedDate":"2025-02-25T12:23:57","DetectionMethod":"Reputation","UserKey":"ThreatIntel","Operation":"AtpDetection","OrganizationId":"d11c33dd-ca0f-4c49-879f-07a61379fb21","EventDeepLink":"https://security.microsoft.com/threatexplorer?dltarget=Explorer&dlstorage=Url&viewid=MalwareContent&starttime=2025-02-04T23:59:59.002Z&endtime=2025-03-09T23:59:59.002Z&query-Id=234f0c48-0a94-43d7-225b-08dd5d93393e","SourceWorkload":"2","Workload":"ThreatIntelligence","RecordType":"47","Version":"1","UserId":"leandro.gonzalez@acanto.io","DetectionDate":"2025-03-07T16:15:19","CreationTime":"2025-03-07T16:16:17","Id":"234f0c48-0a94-43d7-225b-08dd5d93393e","Subscription":"Audit.General","UserType":"4","FileData":{"FilePath":"https://acantoteknos-my.sharepoint.com/personal/lgonzalezr_acantoteknos_com/Documents/Archivos de chat de Microsoft Teams/Remuneraciones 2025 (APROBADOS).rar","SHA256":"Ez4L4/BLdGHeWMG0RJRO452SMDdV1n0PpwxyJWoworM=","FileName":"Remuneraciones 2025 (APROBADOS).rar","MalwareFamily":"Malicious Payload","DocumentId":"eb1e7b80-3a12-4f2e-a959-944d12dab8e9","FileVerdict":"1","FileSize":"2872"}}},"rule":{"firedtimes":1,"mail":true,"level":12,"hipaa":["164.312.b"],"pci_dss":["5.3","6.1","10.6.1"],"description":"Office 365: Phishing and malware events for files in SharePoint, OneDrive for Business, and Microsoft Teams from Microsoft Defender for Office 365.","groups":["office365","ThreatIntelligenceAtpContent"],"id":"91575"},"decoder":{"name":"json"},"input":{"type":"log"},"@timestamp":"2025-03-07T16:19:58.949Z","location":"office365","id":"1741364398.9088948466","timestamp":"2025-03-07T13:19:58.949-0300"}}]}}`;

        // const alert = customSerializer.deserializeObject<Response>(alertStr70022, Response);
        console.log(alertStr);
        const alert = plainToInstance(Response, JSON.parse(alertStr), {
                excludeExtraneousValues: false,
              });
        
        // console.log(alertStr70022.replace(/\\\"/g, '\\\\"'));
        // const alert = plainToInstance(Response, JSON.parse(alertStr70022));
        console.log(alert);
        expect(alert).not.toBeNull();
        expect(alert!.took).toBe(62);
        expect(alert!.timedOut).toBe(false);
        expect(alert!.shards).not.toBeNull();
        expect(alert!.shards!.total).toBe(213);
        expect(alert!.shards!.successful).toBe(213);
        expect(alert!.shards!.skipped).toBe(0);
        expect(alert!.shards!.failed).toBe(0);
        expect(alert!.hits).not.toBeNull();
        expect(alert!.hits!.total).not.toBeNull();
        expect(alert!.hits!.total!.value).toBe(1);
        expect(alert!.hits!.total!.relation).toBe("eq");
        expect(alert!.hits!.maxScore).toBe(14.265003);
        expect(alert!.hits!.hits).not.toBeNull();
        expect(alert!.hits!.hits).toHaveLength(1);
        expect(alert!.hits!.hits![0]).not.toBeNull();
        expect(alert!.hits!.hits![0].source).not.toBeNull();
        expect(alert!.hits!.hits![0].source?.data).not.toBeNull();

        // const dataFw = customSerializer.deserializeObject<DataFw>(hits.hits![0].source!.data!, DataFw);
        // const dataFw = parseKeyValueString(alert.hits.hits![0].source!.data, DataFw);
        // const dataFw = parseKeyValueString(hits.hits![0].source!.data!, DataFw);
        console.log("hits[0]: \\n" + JSON.stringify(alert!.hits!.hits![0].source))

        console.log("source: \\n" + JSON.stringify(alert!.hits!.hits![0].source))
        
        console.log("data: \\n" + JSON.stringify(alert!.hits!.hits![0].source!.data))

        console.log("fullLog: \\n" + JSON.stringify(alert!.hits!.hits![0].source!.fullLog))

        const dataOffice365 = plainToInstance(DataOffice365, JSON.parse(JSON.stringify(alert!.hits!.hits![0].source!.data!)), {
            excludeExtraneousValues: false,
        });

        console.log(dataOffice365);
        expect(dataOffice365).not.toBeNull();
        expect(dataOffice365.office365).not.toBeNull();
        expect(dataOffice365.office365?.userId).toBe('leandro.gonzalez@acanto.io');
        expect(dataOffice365.office365?.fileData).not.toBeNull();
        expect(dataOffice365.office365?.fileData?.fileName).toBe('Remuneraciones 2025 (APROBADOS).rar');
    });












    test('Correct parsing of alert 92650', () => {
        const alertStr = `
{"took":32,"timed_out":false,"_shards":{"total":213,"successful":213,"skipped":0,"failed":0},"hits":{"total":{"value":1,"relation":"eq"},"max_score":10.282837,"hits":[{"_index":"wazuh-alerts-4.x-2025.01.27","_id":"V-71p5QBMdyLz_7yePTd","_score":10.282837,"_source":{"agent":{"ip":"172.31.224.27","name":"NBK-SMIRANDA","id":"176"},"manager":{"name":"wazuh"},"data":{"win":{"eventdata":{"serviceType":"servicio de modo usuario","accountName":"LocalSystem","imagePath":"%SystemRoot%\\\\RtkWiFiManServ.exe","startType":"inicio automático","serviceName":"Realtek Wireless Manager Service"},"system":{"eventID":"7045","eventSourceName":"Service Control Manager","keywords":"0x8080000000000000","providerGuid":"{555908d1-a6d7-4695-8e1e-26931d2012f4}","level":"4","channel":"System","opcode":"0","message":"\\"Se instaló un servicio en el sistema.\\r\\n\\r\\nNombre del servicio:  Realtek Wireless Manager Service\\r\\nNombre del archivo del servicio:  %SystemRoot%\\\\RtkWiFiManServ.exe\\r\\nTipo de servicio:  servicio de modo usuario\\r\\nTipo de inicio de servicio:  inicio automático\\r\\nCuenta de servicio:  LocalSystem\\"","version":"0","systemTime":"2025-01-27T13:30:18.2540367Z","eventRecordID":"1686","threadID":"12988","computer":"NBK-SMIRANDA.acantoteknos.local","task":"0","processID":"1220","severityValue":"INFORMATION","providerName":"Service Control Manager"}}},"rule":{"firedtimes":1,"mail":true,"level":12,"description":"New Windows Service Created to start from windows root path. Suspicious event as the binary may have been dropped using Windows Admin Shares.","groups":["win_evt_channel","windows"],"mitre":{"technique":["SMB/Windows Admin Shares","Service Execution"],"id":["T1021.002","T1569.002"],"tactic":["Lateral Movement","Execution"]},"id":"92650"},"decoder":{"name":"windows_eventchannel"},"input":{"type":"log"},"@timestamp":"2025-01-27T13:31:08.185Z","location":"EventChannel","id":"1737984668.125952629","timestamp":"2025-01-27T10:31:08.185-0300"}}]}}`;

        // const alert = customSerializer.deserializeObject<Response>(alertStr70022, Response);
        console.log(alertStr);
        const alert = plainToInstance(Response, JSON.parse(alertStr), {
                excludeExtraneousValues: false,
              });
        
        // console.log(alertStr70022.replace(/\\\"/g, '\\\\"'));
        // const alert = plainToInstance(Response, JSON.parse(alertStr70022));
        console.log(alert);
        expect(alert).not.toBeNull();
        expect(alert!.took).toBe(32);
        expect(alert!.timedOut).toBe(false);
        expect(alert!.shards).not.toBeNull();
        expect(alert!.shards!.total).toBe(213);
        expect(alert!.shards!.successful).toBe(213);
        expect(alert!.shards!.skipped).toBe(0);
        expect(alert!.shards!.failed).toBe(0);
        expect(alert!.hits).not.toBeNull();
        expect(alert!.hits!.total).not.toBeNull();
        expect(alert!.hits!.total!.value).toBe(1);
        expect(alert!.hits!.total!.relation).toBe("eq");
        expect(alert!.hits!.maxScore).toBe(10.282837);
        expect(alert!.hits!.hits).not.toBeNull();
        expect(alert!.hits!.hits).toHaveLength(1);
        expect(alert!.hits!.hits![0]).not.toBeNull();
        expect(alert!.hits!.hits![0].source).not.toBeNull();
        expect(alert!.hits!.hits![0].source?.data).not.toBeNull();

        // const dataFw = customSerializer.deserializeObject<DataFw>(hits.hits![0].source!.data!, DataFw);
        // const dataFw = parseKeyValueString(alert.hits.hits![0].source!.data, DataFw);
        // const dataFw = parseKeyValueString(hits.hits![0].source!.data!, DataFw);
        console.log("hits[0]: \\n" + JSON.stringify(alert!.hits!.hits![0].source))

        console.log("source: \\n" + JSON.stringify(alert!.hits!.hits![0].source))
        
        console.log("data: \\n" + JSON.stringify(alert!.hits!.hits![0].source!.data))

        const dataWin = plainToInstance(DataWin, JSON.parse(JSON.stringify(alert!.hits!.hits![0].source!.data!)), {
            excludeExtraneousValues: false,
        });

        console.log(dataWin);
        expect(dataWin).not.toBeNull();
        console.log(dataWin.win);
        expect(dataWin.win).not.toBeNull();
        expect(dataWin.win!.eventdata).not.toBeNull();
        console.log("win.eventdata: \\n" + JSON.stringify(dataWin.win!.eventdata))
        expect(dataWin.win!.system).not.toBeNull();
        console.log("win.system: \\n" + JSON.stringify(dataWin.win!.system))
        expect(dataWin.win!.eventdata?.serviceName).toBe('Realtek Wireless Manager Service');
        expect(dataWin.win!.system?.channel).toBe('System');
    });


});
