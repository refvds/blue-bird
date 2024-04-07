import { BsBellFill, BsHouseFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';

export const sidebarItems = [
  {
    label: 'Home',
    href: '/',
    icon: BsHouseFill,
  },
  {
    label: 'Notifications',
    href: '/notifications',
    icon: BsBellFill,
    auth: true,
  },
  {
    label: 'Profile',
    href: '/profile',
    icon: FaUser,
    auth: true,
  },
];
