import clsx from 'clsx';
import './ui-tab-item.css';

import { UiTabItemProps } from '@/src/ui/ui-tab/ui-tab-item/ui-tab-props';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/src/ui/ui-tooltip/tooltip';

export function UiTabItem({
  title,
  icon,
  isPinned = false,
  isActive = false,
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

  if (!isPinned) return button;

  return (
    <Tooltip>
      <TooltipTrigger render={button} />
      <TooltipContent side="bottom" className="flex items-center gap-2">
        {icon}
        {title}
      </TooltipContent>
    </Tooltip>
  );
}
