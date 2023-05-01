export type NavigationTab = {
  link: string;
  label: string;
  badgeValue?: string;

  disabled?: boolean;
  showBadge?: boolean;
  hideInactiveLabel?: boolean;

  icons: {
    active: string;
    inActive: string;
  };
};

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};
