'use client';
import { useState } from 'react';
import { UiTabItem } from '@/src/ui/ui-tab/ui-tab-item/ui-tab-item';
import { UiTabBar } from '@/src/ui/ui-tab/ui-tab-bar/ui-tab-bar';
import { useTabsStore } from '@/src/store/tabs-store/pinned-tabs.store';
import { TabsData } from '@/entities/tab-bar/tabs-array';

export default function TabBarClient() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { pinnedIds, orderedIds, togglePin } = useTabsStore();

  const ordered = orderedIds
    .map(id => TabsData.find(t => t.id === id))
    .filter(Boolean) as typeof TabsData;

  const withPinned = ordered.map(t => ({
    ...t,
    isPinned: pinnedIds.includes(t.id!),
    isActive: t.id === activeId,
  }));

  const sortedTabs = [
    ...withPinned.filter(t => t.isPinned),
    ...withPinned.filter(t => !t.isPinned),
  ];

  return (
    <div className="py-2 w-1/2">
      <UiTabBar className="h-12">
        {sortedTabs.map(tab => (
          <UiTabItem
            key={tab.id}
            title={tab.title}
            icon={tab.icon}
            isPinned={tab.isPinned}
            isActive={tab.isActive}
            onClick={() => setActiveId(tab.id!)}
            onTogglePin={() => togglePin(tab.id!)}
          />
        ))}
      </UiTabBar>
    </div>
  );
}
