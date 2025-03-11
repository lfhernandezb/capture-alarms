// import { JsonObject, JsonProperty } from "typescript-json-serializer";
import { Hit } from "./hit.model";
import { Total } from "./total.model";
import { Expose } from "class-transformer";

// @JsonObject()
export class Hits {
    total?:    Total;
    @Expose({ name: "max_score" })
    maxScore?: number;
    hits?:     Hit[];
}
