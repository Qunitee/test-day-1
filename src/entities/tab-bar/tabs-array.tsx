// entities/tab-bar/tabs-array.tsx

import {
  BarChart3,
  Calculator,
  CircleHelp,
  Landmark,
  LayoutDashboard,
  ListChecks,
  Mail,
  Package,
  Phone,
  Settings,
  ShoppingBag,
  ShoppingCart,
} from 'lucide-react';
import { TabBarItem } from '@/src/entities/tab-bar/tab-bar-item';
import { Routes } from '@/src/shared/constants/routes-constant';

export const TabsData: TabBarItem[] = [
  {
    id: '1',
    title: 'Dashboard',
    url: Routes.Main.Dashboard,
    isPinned: false,
    icon: <LayoutDashboard />,
  },
  {
    id: '2',
    title: 'Banking',
    url: Routes.Main.Banking,
    isPinned: false,
    icon: <Landmark />,
  },
  {
    id: '3',
    title: 'Telefonie',
    url: Routes.Main.Telefonie,
    isPinned: false,
    icon: <Phone />,
  },
  {
    id: '4',
    title: 'Accounting',
    url: Routes.Main.Accounting,
    isPinned: false,
    icon: <Calculator />,
  },
  {
    id: '5',
    title: 'Verkauf',
    url: Routes.Main.Verkauf,
    isPinned: false,
    icon: <ShoppingCart />,
  },
  {
    id: '6',
    title: 'Statistik',
    url: Routes.Main.Statistik,
    isPinned: false,
    icon: <BarChart3 />,
  },
  {
    id: '7',
    title: 'Post Office',
    url: Routes.Main.PostOffice,
    isPinned: false,
    icon: <Mail />,
  },
  {
    id: '8',
    title: 'Administration',
    url: Routes.Main.Administration,
    isPinned: false,
    icon: <Settings />,
  },
  {
    id: '9',
    title: 'Help',
    url: Routes.Main.Help,
    isPinned: false,
    icon: <CircleHelp />,
  },
  {
    id: '10',
    title: 'Warenbestand',
    url: Routes.Main.Warenbestand,
    isPinned: false,
    icon: <Package />,
  },
  {
    id: '11',
    title: 'Auswahllisten',
    url: Routes.Main.Auswahllisten,
    isPinned: false,
    icon: <ListChecks />,
  },
  {
    id: '12',
    title: 'Einkauf',
    url: Routes.Main.Einkauf,
    isPinned: false,
    icon: <ShoppingBag />,
  },
];
