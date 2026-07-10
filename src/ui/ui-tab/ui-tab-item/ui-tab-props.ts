import { ButtonHTMLAttributes } from 'react';

export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  icon?: React.ReactNode;
  isPinned?: boolean;
  url: string;
  isActive?: boolean;
  className?: string;
}
