import React from 'react';

import CartIcon from '@/public/icons/icon-cart.svg';
import CloseIcon from '@/public/icons/icon-close.svg';
import FavoritesIcon from '@/public/icons/icon-favorites.svg';
import MenuIcon from '@/public/icons/icon-menu.svg';
import ScrollUpIcon from '@/public/icons/icon-scroll-up.svg';
import NextIcon from '@/public/icons/icon-next.svg';
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
  className?: string;
}

export const Icon: React.FC<Props> = ({
  name,
  size = 24,
  color = 'default',
  className,
}) => {
  const attrs = {
    width: size,
    height: size,
    className: classNames(styles.icon, styles[`icon--${color}`], className),
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
      case 'scroll-up':
        return <ScrollUpIcon {...attrs} />;
      case 'left':
        return <NextIcon {...attrs} style={{ transform: 'rotate(180deg)' }} />;
      case 'right':
        return <NextIcon {...attrs} />;
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
