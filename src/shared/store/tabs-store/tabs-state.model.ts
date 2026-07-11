export interface TabsState {
  pinnedIds: string[];
  orderedIds: string[];
  hydrated: boolean;
  hydrate: () => void;
  togglePin: (id: string) => void;
  reorder: (activeId: string, overId: string) => void;
}
