import type { RouteAction } from "../types/types.js";

export interface ActionsProvider {
  getRouteActionsMap(): Map<string, RouteAction>;
}
