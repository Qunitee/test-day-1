import { create } from 'zustand';

import { localStorageService } from '@/src/services/local-storage-service';
import { TabsState } from '@/src/store/tabs-store/tabs-state.model';
import { TabsData } from '@/entities/tab-bar/tabs-array';

const PinnedKey = 'pinned';
const OrderKey = 'order';

const defaultOrder = TabsData.map(t => t.id!);

export const useTabsStore = create<TabsState>((set, get) => ({
  pinnedIds: localStorageService.getItem<string[]>(PinnedKey) ?? [],
  orderedIds: localStorageService.getItem<string[]>(OrderKey) ?? defaultOrder,

  togglePin: id => {
    const current = get().pinnedIds;
    const next = current.includes(id)
      ? current.filter(x => x !== id)
      : [...current, id];
    set({ pinnedIds: next });
    localStorageService.setItem(PinnedKey, next);
  },

  reorder: (activeId, overId) => {
    const ids = [...get().orderedIds];
    const from = ids.indexOf(activeId);
    const to = ids.indexOf(overId);
    ids.splice(to, 0, ids.splice(from, 1)[0]);
    set({ orderedIds: ids });
    localStorageService.setItem(OrderKey, ids);
  },
}));
