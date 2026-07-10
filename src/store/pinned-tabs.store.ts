import { create } from 'zustand';
import { localStorageService } from '@/src/services/local-storage-service';

const StorageKey = 'pinned';

interface PinnedTabsState {
  pinnedIds: string[];
  togglePin: (id: string) => void;
}

export const usePinnedTabs = create<PinnedTabsState>((set, get) => ({
  pinnedIds: localStorageService.getItem<string[]>(StorageKey) ?? [],
  togglePin: id => {
    const current = get().pinnedIds;
    const next = current.includes(id)
      ? current.filter(x => x !== id)
      : [...current, id];
    set({ pinnedIds: next });
    localStorageService.setItem(StorageKey, next);
  },
}));
