import React from 'react';
import AddonBadge from '@/public/badges/badge-addon.svg';
import EaPlayBadge from '@/public/badges/badge-ea-play.svg';
import GtaPlusBadge from '@/public/badges/badge-gta-plus.svg';
import PsPlusBadge from '@/public/badges/badge-ps-plus.svg';
import Ps4Badge from '@/public/badges/badge-ps4.svg';
import Ps5Badge from '@/public/badges/badge-ps5.svg';
import Ps4Badge_2 from '@/public/badges/badge-ps4-2.svg';
import Ps5Badge_2 from '@/public/badges/badge-ps5-2.svg';
import Ps4Badge_3 from '@/public/badges/badge-ps4-3.svg';
import Ps5Badge_3 from '@/public/badges/badge-ps5-3.svg';
import UbisoftPlusBadge from '@/public/badges/badge-ubisoft-plus.svg';
import classNames from 'classnames';
import styles from './title-badge.module.scss';

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

export const TitleBadge: React.FC<Props> = ({
  type,
  size = 16,
  className
}) => {
  const renderIcon = () => {
    const icon = ICON_DIMENSIONS[type as allowedNames];
    if (!icon) return null;

    const width = (icon.width / icon.height) * size;
    const viewBox = `0 0 ${icon.width} ${icon.height}`

    switch (type) {
      case 'addon':
        return <AddonBadge
          width={width}
          height={size}
          viewBox={viewBox}
          className={classNames(styles.badge, className)}
        />;
      case 'ea-play':
        return <EaPlayBadge
          width={width}
          height={size}
          viewBox={viewBox}
          className={classNames(styles.badge, className)}
        />;
      case 'gta-plus':
        return <GtaPlusBadge
          width={width}
          height={size}
          viewBox={viewBox}
          className={classNames(styles.badge, className)}
        />;
      case 'ps-plus':
        return <PsPlusBadge
          width={width}
          height={size}
          viewBox={viewBox}
          className={classNames(styles.badge, className)}
        />;
      case 'ps4':
        return <Ps4Badge
          width={width}
          height={size}
          viewBox={viewBox}
          className={classNames(styles.badge, className)}
        />;
      case 'ps5':
        return <Ps5Badge
          width={width}
          height={size}
          viewBox={viewBox}
          className={classNames(styles.badge, className)}
        />;
      case 'ps4-2':
        return <Ps4Badge_2
          width={width}
          height={size}
          viewBox={viewBox}
          className={classNames(styles.badge, className)}
        />;
      case 'ps5-2':
        return <Ps5Badge_2
          width={width}
          height={size}
          viewBox={viewBox}
          className={classNames(styles.badge, className)}
        />;
      case 'ps4-3':
        return <Ps4Badge_3
          width={width}
          height={size}
          viewBox={viewBox}
          className={classNames(styles.badge, className)}
        />;
      case 'ps5-3':
        return <Ps5Badge_3
          width={width}
          height={size}
          viewBox={viewBox}
          className={classNames(styles.badge, className)}
        />;
      case 'ubisoft-plus':
        return <UbisoftPlusBadge
          width={width}
          height={size}
          viewBox={viewBox}
          className={classNames(styles.badge, className)}
        />;
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
