'use client';
import { useState } from 'react';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import { UiTabBar } from '@/src/ui/ui-tab/ui-tab-bar/ui-tab-bar';
import { useTabsStore } from '@/src/store/tabs-store/pinned-tabs.store';
import { TabsData } from '@/entities/tab-bar/tabs-array';
import { UiDraggableTab } from '@/src/ui/ui-tab/ui-draggable-tab/ui-draggable-tab';

export default function TabBarClient() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { pinnedIds, orderedIds, togglePin, reorder } = useTabsStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      reorder(active.id as string, over.id as string);
    }
  };

  return (
    <div className="py-2 w-1/2">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToHorizontalAxis]}
      >
        <SortableContext
          items={sortedTabs.map(t => t.id!)}
          strategy={horizontalListSortingStrategy}
        >
          <UiTabBar className="h-12">
            {sortedTabs.map(tab => (
              <UiDraggableTab
                key={tab.id}
                id={tab.id!}
                title={tab.title}
                icon={tab.icon}
                isPinned={tab.isPinned}
                isActive={tab.isActive}
                onClick={() => setActiveId(tab.id!)}
                onTogglePin={() => togglePin(tab.id!)}
              />
            ))}
          </UiTabBar>
        </SortableContext>
      </DndContext>
    </div>
  );
}
