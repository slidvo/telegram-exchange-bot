import type { EnvironmentService } from "../EnvironmentService.js";

export class DefaultEnvironmentService implements EnvironmentService {
  get(key: string): string | undefined {
    return process.env[key];
  }
}
