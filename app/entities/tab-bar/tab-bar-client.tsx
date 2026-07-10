'use client';
import { useState } from 'react';
import { UiTabItem } from '@/src/ui/ui-tab/ui-tab-item/ui-tab-item';
import { UiTabBar } from '@/src/ui/ui-tab/ui-tab-bar/ui-tab-bar';
import { TabsData } from '@/app/entities/tab-bar/tabs-array';
import { usePinnedTabs } from '@/src/store/pinned-tabs.store';

export default function TabBarClient() {
  const [tabs, setTabs] = useState(TabsData);
  const { pinnedIds, togglePin } = usePinnedTabs();

  const handleTabClick = (id: string) => {
    setTabs(prev => prev.map(tab => ({ ...tab, isActive: tab.id === id })));
  };

  const withPinned = tabs.map(t => ({
    ...t,
    isPinned: pinnedIds.includes(t.id!),
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
            onClick={() => handleTabClick(tab.id!)}
            onTogglePin={() => togglePin(tab.id!)}
          />
        ))}
      </UiTabBar>
    </div>
  );
}
