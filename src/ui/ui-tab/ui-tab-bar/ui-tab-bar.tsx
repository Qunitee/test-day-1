import clsx from 'clsx';
import { UiTabBarProps } from '@/src/ui/ui-tab/ui-tab-bar/ui-tab-bar-props';

export function UiTabBar({ children, className }: UiTabBarProps) {
  const classes = clsx(
    'w-full flex flex-row overflow-auto flex-nowrap px-2',
    className
  );
  return <div className={classes}>{children}</div>;
}
