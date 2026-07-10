'use client';
import { RefObject, useEffect, useState } from 'react';

export function useHiddenTabs(
  containerRef: RefObject<HTMLElement | null>,
  pinnedWidth: number,
  deps: unknown[]
) {
  const [hiddenIds, setHiddenIds] = useState<string[]>([]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const recalc = () => {
      const scrollLeft = el.scrollLeft;
      const viewLeft = scrollLeft + pinnedWidth;
      const viewRight = scrollLeft + el.clientWidth;

      const hidden: string[] = [];
      el.querySelectorAll<HTMLElement>('[data-tab-id]').forEach(node => {
        if (node.dataset.pinned === 'true') return;
        const left = node.offsetLeft;
        const right = left + node.offsetWidth;
        if (right <= viewLeft || left >= viewRight) {
          hidden.push(node.dataset.tabId!);
        }
      });
      setHiddenIds(hidden);
    };

    recalc();
    el.addEventListener('scroll', recalc, { passive: true });
    const ro = new ResizeObserver(recalc);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', recalc);
      ro.disconnect();
    };
  }, deps);

  return hiddenIds;
}
