// To parse this data:
//
//   import { Convert, DataOffice365 } from "./file";
//
//   const dataOffice365 = Convert.toDataOffice365(json);

import { Expose, Type } from "class-transformer";

export class FileData {
    @Expose({ name: 'FilePath' })
    filePath?:      string;
    @Expose({ name: 'SHA256' })
    sha256?:        string;
    @Expose({ name: 'FileName' })
    fileName?:      string;
    @Expose({ name: 'MalwareFamily' })
    malwareFamily?: string;
    @Expose({ name: 'DocumentId' })
    documentId?:    string;
    @Expose({ name: 'FileVerdict' })
    fileVerdict?:   string;
    @Expose({ name: 'FileSize' })
    fileSize?:      string;
}

export class Office365 {
    @Expose({ name: 'LastModifiedBy' })
    lastModifiedBy?:   string;
    @Expose({ name: 'LastModifiedDate' })
    lastModifiedDate?: Date;
    @Expose({ name: 'DetectionMethod' })
    detectionMethod?:  string;
    @Expose({ name: 'UserKey' })
    userKey?:          string;
    @Expose({ name: 'Operation' })
    operation?:        string;
    @Expose({ name: 'OrganizationId' })
    organizationId?:   string;
    @Expose({ name: 'EventDeepLink' })
    eventDeepLink?:    string;
    @Expose({ name: 'SourceWorkload' })
    sourceWorkload?:   string;
    @Expose({ name: 'Workload' })
    workload?:         string;
    @Expose({ name: 'RecordType' })
    recordType?:       string;
    @Expose({ name: 'Version' })
    version?:          string;
    @Expose({ name: 'UserId' })
    userId?:           string;
    @Expose({ name: 'DetectionDate' })
    detectionDate?:    Date;
    @Expose({ name: 'CreationTime' })
    creationTime?:     Date;
    @Expose({ name: 'Id' })
    id?:               string;
    @Expose({ name: 'Subscription' })
    subscription?:     string;
    @Expose({ name: 'UserType' })
    userType?:         string;
    @Type(() => FileData)
    @Expose({ name: 'FileData' })
    fileData?:         FileData;
}

export class DataOffice365 {
    integration?: string;
    @Type(() => Office365)
    office365?:   Office365;
}
