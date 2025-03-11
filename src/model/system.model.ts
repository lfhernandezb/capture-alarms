export interface System {
    eventID?:       string;
    keywords?:      string;
    providerGUID?:  string;
    level?:         string;
    channel?:       string;
    opcode?:        string;
    message?:       string;
    version?:       string;
    systemTime?:    Date;
    eventRecordID?: string;
    threadID?:      string;
    computer?:      string;
    task?:          string;
    processID?:     string;
    severityValue?: string;
    providerName?:  string;
}