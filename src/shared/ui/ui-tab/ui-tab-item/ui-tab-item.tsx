import clsx from 'clsx';
import './ui-tab-item.css';

import { UiTabItemProps } from '@/src/shared/ui/ui-tab/ui-tab-item/ui-tab-props';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/src/shared/ui/ui-context-menu/context-menu';
import { Pin, PinOff } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/src/shared/ui/ui-tooltip/tooltip';

export function UiTabItem({
  title,
  icon,
  isPinned = false,
  isActive = false,
  onTogglePin,
  className,
  ...props
}: UiTabItemProps) {
  const classes = clsx(
    'flex justify-center items-center shrink-0 max-w-48 gap-2 px-4 py-2 tab-item',
    isActive && 'tab-active',
    isPinned && 'tab-pinned',
    className
  );

  const button = (
    <button className={classes} {...props}>
      {icon && <span className="flex items-center">{icon}</span>}
      {!isPinned && title}
    </button>
  );

  const withMenu = (
    <ContextMenu>
      <ContextMenuTrigger render={button} />
      <ContextMenuContent>
        <ContextMenuItem onClick={onTogglePin}>
          {isPinned ? <PinOff /> : <Pin />}
          {isPinned ? 'Tab loslösen' : 'Tab anpinnen'}
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );

  if (!isPinned) return withMenu;

  return (
    <Tooltip>
      <TooltipTrigger render={withMenu} />
      <TooltipContent side="bottom" className="flex items-center gap-2">
        {icon}
        {title}
      </TooltipContent>
    </Tooltip>
  );
}
