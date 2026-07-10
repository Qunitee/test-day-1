export interface TabsState {
  pinnedIds: string[];
  orderedIds: string[];
  togglePin: (id: string) => void;
  reorder: (activeId: string, overId: string) => void;
}
