import clsx from 'clsx';
import { UiTabBarProps } from '@/src/shared/ui/ui-tab/ui-tab-bar/ui-tab-bar-props';
import './tab-bar.css';
import { useRef } from 'react';
import { ScrollSpeedCoeff } from '@/src/shared/constants/scroll-speed-coeff';

export function UiTabBar({ children, className, containerRef }: UiTabBarProps) {
  const ref = useRef<HTMLDivElement>(null);

  const setRef = (el: HTMLDivElement | null) => {
    ref.current = el;
    containerRef?.(el);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY === 0) return;
    e.preventDefault();
    ref.current?.scrollBy({ left: e.deltaY * ScrollSpeedCoeff });
  };

  const classes = clsx(
    'w-full flex flex-row overflow-auto flex-nowrap px-2 tab-bar',
    className
  );

  return (
    <div ref={setRef} className={classes} onWheel={handleWheel}>
      {children}
    </div>
  );
}
