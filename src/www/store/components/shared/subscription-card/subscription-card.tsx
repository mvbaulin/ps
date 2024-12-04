import React from 'react';
import classNames from 'classnames';
import styles from './subscription-card.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { ISubscription } from '@/types/subscription';
import { LogoSizes, SubscriptionTypes } from '@/constants/constants';
import { Button } from '@/components/ui';
import { Color } from '@/types/color';

interface Props {
  subscription: ISubscription[];
  className?: string;
}

export const SubscriptionCard: React.FC<Props> = ({
  subscription,
  className
}) => {
  const commonData = {
    category: subscription[0].category,
    logo: subscription[0].logo,
    background: subscription[0].background,
    link: subscription[0].link,
    type: subscription[0].type as keyof typeof SubscriptionTypes
  };

  const logoSize = LogoSizes[SubscriptionTypes[commonData.type]];

  return (
    <article className={classNames(
        styles.card,
        styles[`card--${commonData.category}`],
        className,
      )}
    >
      <Link
        className={classNames(styles.wrapper, styles['wrapper--mobile'])}
        href={commonData.link}
      >
        <Image
          className={classNames(styles.logo)}
          src={commonData.logo}
          alt={commonData.category}
          width={logoSize.width}
          height={logoSize.height}
        />

        <span className={classNames(styles.marker)}>
          Подробнее
        </span>
      </Link>

      <div className={classNames(styles.wrapper, styles['wrapper--tablet'])}>
        <div className={classNames(styles.inner)}>
          <Image
            className={classNames(styles.logo)}
            src={commonData.logo}
            alt={commonData.category}
            width={logoSize.width * 1.2}
            height={logoSize.height * 1.2}
          />

          <p className={classNames(styles.description)}>
            {subscription[0].description}
          </p>
        </div>

        <Button
          type="link"
          href={commonData.link}
          className={classNames(styles.button)}
          color={commonData.category as Color}
        >
          Подробнее
        </Button>
      </div>
    </article>
  );
};
