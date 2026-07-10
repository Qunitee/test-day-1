'use client';
import { UiTabItem } from '@/src/ui/ui-tab/ui-tab-item/ui-tab-item';
import { BarChartIcon, Settings } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  const [tabs, setTabs] = useState([
    {
      id: '1',
      title: 'Overview',
      url: '/overview',
      isPinned: false,
      isActive: true,
    },
    {
      id: '2',
      title: 'Analytics',
      url: '/analytics',
      isPinned: false,
      isActive: false,
      icon: <BarChartIcon size={16} />,
    },
    {
      id: '3',
      title: 'Reports',
      url: '/reports',
      isPinned: false,
      isActive: false,
    },
    {
      id: '4',
      title: 'Settings',
      url: '/settings',
      isPinned: true,
      isActive: false,
      icon: <Settings />,
    },
  ]);

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
    <div>
      <main>
        {sortedTabs.map(tab => (
          <UiTabItem
            key={tab.id}
            title={tab.title}
            icon={tab.icon}
            isPinned={tab.isPinned}
            isActive={tab.isActive}
            url={tab.url}
            onClick={() => {
              handleTabClick(tab.id);
              console.log('1');
            }}
          />
        ))}
      </main>
    </div>
  );
}
