import { Expose, Type } from "class-transformer";
import { Agent } from "./agent.model";
import { Decoder } from "./decoder.model";
import { Rule } from "./rule.model";
import { Input } from "./input.model";

export class Source {
    @Type(() => Agent)
    agent?:           Agent;
    @Type(() => Decoder)
    manager?:         Decoder;
    data?:            string;
    @Type(() => Rule)
    rule?:            Rule;
    @Type(() => Decoder)
    decoder?:         Decoder;
    @Expose({ name: 'full_log' })
    fullLog?:        string;
    @Type(() => Input)
    input?:           Input;
    timestamp?:       Date;
    location?:        string;
    id?:              string;
    sourceTimestamp?: string;
}