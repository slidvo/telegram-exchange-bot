import type { RouteAction } from "../types/types.js";

export interface RouteActionsProvider {
  getActionsMap(): Map<string, RouteAction>;
}
