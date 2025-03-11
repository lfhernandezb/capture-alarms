import { JsonObject } from "typescript-json-serializer";

@JsonObject()
export class Shards {
    total?:      number;
    successful?: number;
    skipped?:    number;
    failed?:     number;
}