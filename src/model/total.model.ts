import { JsonObject } from "typescript-json-serializer";

@JsonObject()
export class Total {
    value?:    number;
    relation?: string;
}