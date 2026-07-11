import { UiTabItemProps } from '@/src/shared/ui/ui-tab/ui-tab-item/ui-tab-props';

export interface UiDraggableTabProps extends UiTabItemProps {
  id: string;
  onTogglePin: () => void;
}
