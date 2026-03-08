export interface EnvironmentService {
  get(key: string): Promise<string>;
}
