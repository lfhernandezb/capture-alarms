// import { customSerializer, defaultSerializer } from "../libs/customSerializer";
import { plainToInstance } from "class-transformer";
import { Response } from "../model/response.model";

const jsonResponse = `{
  "took": 123,
  "timed_out": false,
  "_shards": { "total": 1, "successful": 1, "skipped": 0, "failed": 0 },
  "hits": { "total": { "value": 1, "relation": "eq" }, "max_score": 1, "hits": [] }
}`;

test('Deserialize correctlñy', () => {
    // const response = customSerializer.deserializeObject<Response>(jsonResponse, Response);
    const response = plainToInstance(Response, JSON.parse(jsonResponse), {
        excludeExtraneousValues: false,
      });
    console.log(response);
    expect(response).not.toBeNull();
    expect(response!.took).toBe(123);
    expect(response!.timedOut).toBe(false);
    expect(response!.shards).not.toBeNull();
    expect(response!.shards!.total).toBe(1);
    expect(response!.shards!.successful).toBe(1);
    expect(response!.shards!.skipped).toBe(0);
    expect(response!.shards!.failed).toBe(0);
    expect(response!.hits).not.toBeNull();
    expect(response!.hits!.total).not.toBeNull();
    expect(response!.hits!.total!.value).toBe(1);
    expect(response!.hits!.total!.relation).toBe("eq");
    expect(response!.hits!.maxScore).toBe(1.0);
    expect(response!.hits!.hits).not.toBeNull();
    expect(response!.hits!.hits).toHaveLength(0);

});

