// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons-react';
import { BiSolidCricketBall } from "react-icons/bi";
// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  BiSolidCricketBall
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'Add Your Box',
      title: 'Add Your Box',
      type: 'item',
      url: '/utils/util-typography',
      icon: icons.BiSolidCricketBall,
      breadcrumbs: false
    },
    {
      id: 'util-color',
      title: 'Color',
      type: 'item',
      url: '/utils/util-color',
      icon: icons.IconPalette,
      breadcrumbs: false
    },
    {
      id: 'util-shadow',
      title: 'Shadow',
      type: 'item',
      url: '/utils/util-shadow',
      icon: icons.IconShadow,
      breadcrumbs: false
    }
  ]
};

export default utilities;
