export type ErrorPageAction = {
  label: string;
  href?: string;
  onClick?: () => void;
};

export type ErrorPageProps = {
  title?: string;
  message?: string;
  primaryAction?: ErrorPageAction;
  secondaryAction?: ErrorPageAction;
  className?: string;
};
