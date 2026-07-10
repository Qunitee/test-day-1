'use client';
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
import { UiDraggableTab } from '@/src/ui/ui-tab/ui-draggable-tab/ui-draggable-tab';
import { UiTabBar } from '@/src/ui/ui-tab/ui-tab-bar/ui-tab-bar';
import { DraggableTabBarProps } from '@/entities/tab-bar/components/tab-bar/draggable-tab-bar-props';

export function DraggableTabBar({
  tabs,
  containerRef,
  onTabClick,
  onTogglePin,
  onReorder,
}: DraggableTabBarProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (over && active.id !== over.id) {
      onReorder(active.id as string, over.id as string);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToHorizontalAxis]}
    >
      <SortableContext
        items={tabs.filter(t => !t.isPinned).map(t => t.id!)}
        strategy={horizontalListSortingStrategy}
      >
        <UiTabBar className="h-12 min-w-0" containerRef={containerRef}>
          {tabs.map(tab => (
            <UiDraggableTab
              key={tab.id}
              id={tab.id!}
              title={tab.title}
              icon={tab.icon}
              isPinned={tab.isPinned}
              isActive={tab.isActive}
              onClick={() => onTabClick(tab.id!)}
              onTogglePin={() => onTogglePin(tab.id!)}
            />
          ))}
        </UiTabBar>
      </SortableContext>
    </DndContext>
  );
}
