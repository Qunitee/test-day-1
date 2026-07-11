import { TabBarItem } from '@/src/entities/tab-bar/tab-bar-item';

export interface DraggableTabBarProps {
  tabs: TabBarItem[];
  containerRef: (el: HTMLDivElement | null) => void;
  onTabClick: (id: string) => void;
  onTogglePin: (id: string) => void;
  onReorder: (activeId: string, overId: string) => void;
}
