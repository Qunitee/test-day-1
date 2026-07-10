import { TabProps } from '@/src/ui/ui-tab/ui-tab-item/ui-tab-props';
import clsx from 'clsx';
import './ui-tab-item.css';

export function UiTabItem({
  title,
  icon,
  isPinned = false,
  isActive = false,
  className,
  ...props
}: TabProps) {
  const classes = clsx(
    'flex justify-center items-center w-full max-w-48 gap-2 px-4 py-2 tab-item',
    isActive && 'tab-active',
    isPinned && 'tab-pinned',
    className
  );

  return (
    <button className={classes} {...props}>
      {icon && <span className="">{icon}</span>}
      {!isPinned && <b>{title}</b>}
    </button>
  );
}
