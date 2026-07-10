'use client';

import {useCallback, useEffect, useRef, useState} from 'react';
import {usePathname, useRouter} from 'next/navigation';
import {DraggableTabBar} from '@/src/components/drag-and-drop/draggable-tab-bar/draggable-tab-bar';
import {TabDropdown} from '@/entities/tab-bar/components/tab-bar-dropdown/tab-bar-dropdown';
import {useTabsStore} from '@/src/store/tabs-store/pinned-tabs.store';
import {TabsData} from '@/entities/tab-bar/tabs-array';
import {useHiddenTabs} from '@/src/hooks/use-hidden-tabs.hook';

export default function TabBarClient() {
  const pathname = usePathname();
  const router = useRouter();
  const [pinnedWidth, setPinnedWidth] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const { pinnedIds, orderedIds, togglePin, reorder } = useTabsStore();

  const currentActiveTab = TabsData.find(t => t.url === pathname);
  const activeId = currentActiveTab?.id ?? null;

  const ordered = orderedIds
    .map(id => TabsData.find(t => t.id === id))
    .filter(Boolean) as typeof TabsData;

  const withPinned = ordered.map(t => ({
    ...t,
    isPinned: pinnedIds.includes(t.id!),
    isActive: t.id === activeId,
  }));

  const pinned = withPinned.filter(t => t.isPinned);
  const unpinned = withPinned.filter(t => !t.isPinned);
  const sortedTabs = [...pinned, ...unpinned];

  const setScrollRef = useCallback((el: HTMLDivElement | null) => {
    scrollRef.current = el;
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let width = 0;
    el.querySelectorAll<HTMLElement>('[data-pinned="true"]').forEach(node => {
      width += node.offsetWidth;
    });
    setPinnedWidth(width);
  }, [pinnedIds, orderedIds]);

  const hiddenIds = useHiddenTabs(scrollRef, pinnedWidth, [
    orderedIds.join(),
    pinnedIds.join(),
    pinnedWidth,
  ]);

  const hiddenTabs = unpinned
    .filter(t => hiddenIds.includes(t.id!))
    .map(t => ({ id: t.id!, title: t.title, icon: t.icon }));

  const handleTabClick = (id: string) => {
    const targetTab = TabsData.find(t => t.id === id);
    if (targetTab?.url) {
      router.push(targetTab.url);
    }
  };

  const goToTab = (id: string) => {
    handleTabClick(id);
    scrollRef.current
      ?.querySelector<HTMLElement>(`[data-tab-id="${id}"]`)
      ?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
  };

  return (
    <div className="py-2 w-full">
      <div className="relative flex items-center gap-2">
        <DraggableTabBar
          tabs={sortedTabs}
          containerRef={setScrollRef}
          onTabClick={handleTabClick}
          onTogglePin={togglePin}
          onReorder={reorder}
        />
        <TabDropdown tabs={hiddenTabs} onSelect={goToTab} />
      </div>
    </div>
  );
}
