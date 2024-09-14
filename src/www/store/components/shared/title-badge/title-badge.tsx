import React from 'react';
import AddonBadge from '@/public/badges/badge-addon.svg';
import EaPlayBadge from '@/public/badges/badge-ea-play.svg';
import GtaPlusBadge from '@/public/badges/badge-gta-plus.svg';
import PsPlusBadge from '@/public/badges/badge-ps-plus.svg';
import Ps4Badge from '@/public/badges/badge-ps4.svg';
import Ps5Badge from '@/public/badges/badge-ps5.svg';
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
  'ubisoft-plus';

interface Props {
  type: allowedNames | string;
}

export const TitleBadge: React.FC<Props> = ({
  type
}) => {
  const renderIcon = () => {
    switch (type) {
      case 'addon':
        return <AddonBadge
          width={55}
          height={16}
          className={classNames(styles.badge, styles['badge--addon'])}
        />;
      case 'ea-play':
        return <EaPlayBadge
          width={16}
          height={16}
          className={classNames(styles.badge, styles['badge--ea-play'])}
        />;
      case 'gta-plus':
        return <GtaPlusBadge
          width={23}
          height={16}
          className={classNames(styles.badge, styles['badge--gta-plus'])}
        />;
      case 'ps-plus':
        return <PsPlusBadge
          width={16}
          height={16}
          className={classNames(styles.badge, styles['badge--ps-plus'])}
        />;
      case 'ps4':
        return <Ps4Badge
          width={33}
          height={16}
          className={classNames(styles.badge, styles['badge--ps4'])}
        />;
      case 'ps5':
        return <Ps5Badge
          width={32}
          height={16}
          className={classNames(styles.badge, styles['badge--ps5'])}
        />;
      case 'ubisoft-plus':
        return <UbisoftPlusBadge
          width={27}
          height={16}
          className={classNames(styles.badge, styles['badge--ubisoft-plus'])}
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
