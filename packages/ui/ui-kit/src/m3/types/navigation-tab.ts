export type NavigationTabContent = {
  link: string;
  label: string;
  badgeValue?: string;

  disabled?: boolean;
  showBadge?: boolean;

  icons: {
    active: string;
    inActive: string;
  };
};
