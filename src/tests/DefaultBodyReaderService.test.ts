import { describe, it, expect } from "vitest";
import DefaultBodyReaderService from "../services/impl/DefaultBodyReaderService.js";
import { IncomingMessage } from "node:http";
import { PassThrough } from "node:stream";
import Logger from "../utils/logger.js";

describe("DefaultBodyReaderService", () => {
  it("should read body correctly", async () => {
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
    const result = await brs.readBody<BodyType>(mockBody);
    Logger.DEBUG(
      `brs.readBody<BodyType>(mockBody) result ${JSON.stringify(result)}`,
    );
    expect(result.id).toBe(2);
  });
});
