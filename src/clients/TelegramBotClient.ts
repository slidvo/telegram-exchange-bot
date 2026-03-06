export default interface TelegramBotClient {
  sendMessage(msg: string): void;
}
