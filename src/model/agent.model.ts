import { JsonObject } from "typescript-json-serializer";

@JsonObject()
export class Agent {
    name?: string;
    id?:   string;
}