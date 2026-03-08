export interface CommandsService {
  start(chat_id: number | string): Promise<void>;
  info(): void;
  currency(): void;
}
