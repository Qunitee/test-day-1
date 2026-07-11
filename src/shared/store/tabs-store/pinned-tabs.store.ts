import { create } from 'zustand';

import { localStorageService } from '@/src/shared/services/local-storage-service';
import { TabsState } from '@/src/shared/store/tabs-store/tabs-state.model';
import { TabsData } from '@/src/entities/tab-bar/tabs-array';

const PinnedKey = 'pinned';
const OrderKey = 'order';

const defaultOrder = TabsData.map(t => t.id!);

const reconcileOrder = (storedOrder: string[] | null) =>
  storedOrder
    ? [
        ...storedOrder.filter(id => defaultOrder.includes(id)),
        ...defaultOrder.filter(id => !storedOrder.includes(id)),
      ]
    : defaultOrder;

export const useTabsStore = create<TabsState>((set, get) => ({
  // Initialize with server-safe defaults so the first client render matches
  // the SSR output; persisted state is loaded in hydrate() after mount.
  pinnedIds: [],
  orderedIds: defaultOrder,
  hydrated: false,

  hydrate: () => {
    if (get().hydrated) return;
    set({
      pinnedIds: localStorageService.getItem<string[]>(PinnedKey) ?? [],
      orderedIds: reconcileOrder(localStorageService.getItem<string[]>(OrderKey)),
      hydrated: true,
    });
  },

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
    if (from === -1 || to === -1) return;
    ids.splice(to, 0, ids.splice(from, 1)[0]);
    set({ orderedIds: ids });
    localStorageService.setItem(OrderKey, ids);
  },
}));
