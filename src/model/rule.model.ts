import { JsonObject } from "typescript-json-serializer";

@JsonObject()
export class Rule {
    firedtimes?:  number;
    mail?:        boolean;
    level?:       number;
    description?: string;
    groups?:      string[];
    id?:          string;
}
