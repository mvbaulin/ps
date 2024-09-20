import React from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import styles from './icon.module.scss';
import { IconNames } from '@/types/icon';

interface Props {
  name: IconNames;
  size?: number;
  color?: string;
  className?: string;
}

const ICON_PATHS = {
  'cart': '/icons/icon-cart.svg',
  'close': '/icons/icon-close.svg',
  'favorites': '/icons/icon-favorites.svg',
  'menu': '/icons/icon-menu.svg',
  'scroll-up': '/icons/icon-scroll-up.svg',
  'left': '/icons/icon-next.svg',
  'right': '/icons/icon-next.svg',
  'star-full': '/icons/icon-star-full.svg',
  'star-half': '/icons/icon-star-half.svg',
  'star-empty': '/icons/icon-star-empty.svg',
};

export const Icon: React.FC<Props> = ({
  name,
  size = 24,
  color = '',
  className,
}) => {
  const iconPath = ICON_PATHS[name];

  if (!iconPath) return null;

  const attrs = {
    width: size,
    height: size,
    className: classNames(styles.icon, styles[`icon--${name}`], className),
  };

  return (
    <Image
      src={iconPath}
      alt={`${name} icon`}
      width={size}
      height={size}
      className={classNames(attrs.className)}
      {...(name === 'left' ? { style: { transform: 'rotate(180deg)' } } : {})}
    />
  );
};

export default Icon;
