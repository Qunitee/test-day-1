import { ReactNode } from 'react';

export interface HiddenTab {
  id: string;
  title: string;
  icon?: ReactNode;
}

export interface HiddenTabProps {
  tabs: HiddenTab[];
  onSelect: (id: string) => void;
}
