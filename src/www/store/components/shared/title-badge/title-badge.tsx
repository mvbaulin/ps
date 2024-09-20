import React from 'react';
import Image from 'next/image';
import classNames from 'classnames';

type allowedNames =
  'addon' |
  'ea-play' |
  'gta-plus' |
  'ps-plus' |
  'ps4' |
  'ps5' |
  'ps4-2' |
  'ps5-2' |
  'ps4-3' |
  'ps5-3' |
  'ubisoft-plus';

interface Props {
  type: allowedNames | string;
  size?: number;
  className?: string;
  color?: string;
}

const ICON_DIMENSIONS = {
  addon: { width: 55, height: 16 },
  'ea-play': { width: 16, height: 16 },
  'gta-plus': { width: 23, height: 16 },
  'ps-plus': { width: 16, height: 16 },
  ps4: { width: 33, height: 16 },
  ps5: { width: 32, height: 16 },
  'ps4-2': { width: 29, height: 16 },
  'ps5-2': { width: 29, height: 16 },
  'ps4-3': { width: 72, height: 16 },
  'ps5-3': { width: 74, height: 16 },
  'ubisoft-plus': { width: 27, height: 16 },
};

const BADGE_PATHS = {
  addon: '/badges/badge-addon.svg',
  'ea-play': '/badges/badge-ea-play.svg',
  'gta-plus': '/badges/badge-gta-plus.svg',
  'ps-plus': '/badges/badge-ps-plus.svg',
  ps4: '/badges/badge-ps4.svg',
  ps5: '/badges/badge-ps5.svg',
  'ps4-2': '/badges/badge-ps4-2.svg',
  'ps5-2': '/badges/badge-ps5-2.svg',
  'ps4-3': '/badges/badge-ps4-3.svg',
  'ps5-3': '/badges/badge-ps5-3.svg',
  'ubisoft-plus': '/badges/badge-ubisoft-plus.svg',
};

export const TitleBadge: React.FC<Props> = ({
  type,
  size = 16,
  className,
}) => {
  const icon = ICON_DIMENSIONS[type as allowedNames];
  const badgePath = BADGE_PATHS[type as allowedNames];

  if (!icon || !badgePath) return null;

  const width = (icon.width / icon.height) * size;

  return (
    <Image
      src={badgePath}
      alt={`${type} badge`}
      width={width}
      height={size}
      className={classNames(className)}
    />
  );
};
