import type Message from "./Message.js";

/**
 * This object represents an incoming update.
 * At most one of the optional parameters can be present in any given update.
 * Official documentaion link https://core.telegram.org/bots/api#update
 */
export default interface Update {
  /**
   * Uniquie identifier
   */
  update_id: number;
  /**
   * New incoming message of any kind - text, photo, sticker, etc.
   */
  message: Message;
  //TODO Add missing fields
}
