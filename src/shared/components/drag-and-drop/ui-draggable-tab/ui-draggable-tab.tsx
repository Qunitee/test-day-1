
import { useSortable } from '@dnd-kit/sortable';
import clsx from 'clsx';
import { UiTabItem } from '@/src/shared/ui/ui-tab/ui-tab-item/ui-tab-item';
import { CSS } from '@dnd-kit/utilities';
import { UiDraggableTabProps } from './ui-draggable-tab-props';

export function UiDraggableTab({ id, isPinned, ...tabProps }: UiDraggableTabProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled: isPinned });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 30 : isPinned ? 20 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      data-tab-id={id}
      data-pinned={isPinned}
      className={clsx('shrink-0 flex bg-white', isPinned && 'sticky left-0')}
      {...attributes}
      {...listeners}
    >
      <UiTabItem isPinned={isPinned} {...tabProps} />
    </div>
  );
}
