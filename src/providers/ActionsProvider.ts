export interface ActionsProvider {
  getActionsMap<T>(): Map<string, T>;
}
