import { describe, it, expect } from "vitest";
import DefaultBodyReaderService from "../services/impl/DefaultBodyReaderService.js";
import { IncomingMessage } from "node:http";
import { PassThrough } from "node:stream";
import log from "../utils/logger.js";

describe("DefaultBodyReaderService", () => {
  it("should read json body", async () => {
    const brs = new DefaultBodyReaderService();
    type BodyType = { id: number };
    const body: BodyType = { id: 2 };
    const createMockBody: (body: Object) => IncomingMessage = (body) => {
      const stream = new PassThrough();
      const req = stream as unknown as IncomingMessage;
      stream.write(JSON.stringify(body));
      stream.end();
      return req;
    };
    const mockBody = createMockBody(body);
    const result = (await brs.readBody(mockBody)) as BodyType;
    log.DEBUG(`result: ${JSON.stringify(result)}`);
    expect(result.id).toBe(body.id);
  });
  //===
  it("should read html body", async () => {
    const brs = new DefaultBodyReaderService();
    type BodyType = { id: number };
    const body: string = "<html></html>";
    const createMockBody: (body: Object) => IncomingMessage = (body) => {
      const stream = new PassThrough();
      const req = stream as unknown as IncomingMessage;
      stream.write(JSON.stringify(body));
      stream.end();
      return req;
    };
    const mockBody = createMockBody(body);
    const result = await brs.readBody(mockBody);
    log.DEBUG(`html body : ${result}`);
    expect(result).toBe(body);
  });
});
