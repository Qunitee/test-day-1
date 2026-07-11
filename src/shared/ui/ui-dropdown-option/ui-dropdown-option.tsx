import { UiDropdownOptionProps } from '@/src/shared/ui/ui-dropdown-option/ui-dropdown-option-props';

export function UiDropdownOption({
  icon,
  title,
  onClick,
}: UiDropdownOptionProps) {
  return (
    <li>
      <button
        onClick={onClick}
        className="flex items-center gap-2 w-full px-3 py-2 hover:bg-slate-100"
      >
        {icon}
        {title}
      </button>
    </li>
  );
}
