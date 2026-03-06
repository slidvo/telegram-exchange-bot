import type Chat from "./Chat.js";
import type MessageEntity from "./MessageEntity.js";
import type User from "./User.js";

/**
 * This object represents a message.
 * Official documentation link https://core.telegram.org/bots/api#message
 */
export default interface Message {
  message_id: number;
  from: User;
  chat: Chat;
  date: number;
  text: string;
  entities: Array<MessageEntity>;
  /**
     * {
    message_id: 13,
    from: {
      id: 1121350993,
      is_bot: false,
      first_name: 'Viacheslav',
      last_name: 'K',
      username: 'ViacheslavKopeika',
      language_code: 'ru',
      is_premium: true
    },
    chat: {
      id: 1121350993,
      first_name: 'Viacheslav',
      last_name: 'K',
      username: 'ViacheslavKopeika',
      type: 'private'
    },
    date: 1772551566,
    text: '/info',
    entities: [ [Object] ]
  }
     */
}
