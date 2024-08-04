declare type NavButtonProps = {
  href: string;
  label: string;
  isActive: boolean;
};

declare type NewAccountState = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};
