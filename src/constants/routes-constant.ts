export const Routes = {
  Main: {
    Dashboard: '/dashboard',
    Banking: '/banking',
    Telefonie: '/telefonie',
    Accounting: '/accounting',
    Verkauf: '/verkauf',
    Statistik: '/statistik',
    PostOffice: '/post-office',
    Administration: '/administration',
    Help: '/help',
    Warenbestand: '/warenbestand',
    Auswahllisten: '/auswahllisten',
    Einkauf: '/einkauf',
  },
} as const;

export type AppRoutes = typeof Routes;
