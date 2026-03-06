export interface CommandsHandlerService {
  handleCommand(updateMessageText: string): void;
  searchCommand(text: string): string | undefined;
}
