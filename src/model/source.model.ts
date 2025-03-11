import { JsonObject } from "typescript-json-serializer";
import { Agent } from "./agent.model";
import { Decoder } from "./decoder.model";
import { Rule } from "./rule.model";
import { Input } from "./input.model";

@JsonObject()
export class Source {
    agent?:           Agent;
    manager?:         Decoder;
    data?:            string;
    rule?:            Rule;
    decoder?:         Decoder;
    fullLog?:        string;
    input?:           Input;
    timestamp?:       Date;
    location?:        string;
    id?:              string;
    sourceTimestamp?: string;
}