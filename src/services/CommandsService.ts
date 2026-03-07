export interface CommandsService {
  start(chat_id: number | string): void;
  info(): void;
  currency(): void;
}
