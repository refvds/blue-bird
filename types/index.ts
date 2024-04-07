import { IconType } from 'react-icons';

export interface ISidebarItem {
  label: string;
  href: string;
  icon: IconType;
  auth?: boolean;
}
