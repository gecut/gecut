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

// TODO: create a renderer for navigation tab content
