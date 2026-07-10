'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { UiDropdownOption } from '@/src/ui/ui-dropdown-option/ui-dropdown-option';
import { HiddenTabProps } from '@/entities/tab-bar/components/tab-bar-dropdown/tab-bar-dropdown-props';

export function TabDropdown({ tabs, onSelect }: HiddenTabProps) {
  const [open, setOpen] = useState(false);

  if (tabs.length === 0) return null;

  return (
    <div className="relative shrink-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center justify-center px-3 h-12 tab-item"
      >
        <ChevronDown size={18} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <ul className="absolute right-0 top-full mt-1 min-w-52 bg-white shadow-lg rounded-md z-50 py-1 border border-[#ededed]">
            {tabs.map(tab => (
              <UiDropdownOption
                key={tab.id}
                icon={tab.icon}
                title={tab.title}
                onClick={() => {
                  onSelect(tab.id);
                  setOpen(false);
                }}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
