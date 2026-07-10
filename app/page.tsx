'use client';
import {UiTabItem} from '@/src/ui/ui-tab/ui-tab-item/ui-tab-item';
import {useState} from 'react';
import {UiTabBar} from '@/src/ui/ui-tab/ui-tab-bar/ui-tab-bar';
import {TabsData} from '@/app/entities/tab-bar/tabs-array';

export default function Home() {
  const [tabs, setTabs] = useState(TabsData);

  const handleTabClick = (id: string) => {
    setTabs(prev =>
      prev.map(tab => ({
        ...tab,
        isActive: tab.id === id,
      }))
    );
  };

  const sortedTabs = [
    ...tabs.filter(t => t.isPinned),
    ...tabs.filter(t => !t.isPinned),
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
            onClick={() => {
              handleTabClick(tab.id!);
            }}
          />
        ))}
      </UiTabBar>
    </div>
  );
}
