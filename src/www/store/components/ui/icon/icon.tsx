import React from 'react';

import CartIcon from '@/public/icons/icon-cart.svg';
import CloseIcon from '@/public/icons/icon-close.svg';
import FavoritesIcon from '@/public/icons/icon-favorites.svg';
import MenuIcon from '@/public/icons/icon-menu.svg';
import classNames from 'classnames';
import styles from './icon.module.scss';


type AllowedNames =
  'cart' |
  'close' |
  'favorites' |
  'left' |
  'menu' |
  'right' |
  'scroll-up' |
  'search';

type AllowedColors =
  'default' |
  'primary' |
  'secondary' |
  'tetriary';

interface Props {
  name: AllowedNames;
  size?: number;
  color?: AllowedColors;
}

export const Icon: React.FC<Props> = ({
  name,
  size = 24,
  color = 'default'
}) => {
  const attrs = {
    width: size,
    height: size,
    className: classNames(styles.icon, styles[`icon--${color}`]),
  };

  const renderIcon = () => {
    switch (name) {
      case 'cart':
        return <CartIcon {...attrs} />;
      case 'close':
        return <CloseIcon {...attrs} />;
      case 'favorites':
        return <FavoritesIcon {...attrs} />;
      case 'menu':
        return <MenuIcon {...attrs} />;
      default:
        return null;
    }
  };

  return (
    <>
      {renderIcon()}
    </>
  );
};

export default Icon;
