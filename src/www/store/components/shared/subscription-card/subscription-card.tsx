import React from 'react';
import classNames from 'classnames';
import styles from './subscription-card.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { ISubscription } from '@/types/subscription';
import { LogoSizes, SubscriptionTypes } from '@/constants/constants';
import { Button } from '@/components/ui';

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
      </Link>

      <div className={classNames(styles.wrapper, styles['wrapper--tablet'])}>
        <Image
          className={classNames(styles.logo)}
          src={commonData.logo}
          alt={commonData.category}
          width={logoSize.width}
          height={logoSize.height}
        />

        <p className={classNames(styles.description)}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia illum praesentium doloribus sint doloremque veniam beatae distinctio voluptatibus error blanditiis.
        </p>

        <Button
          type="link"
          href={commonData.link}
          className={classNames(styles.button)}
        >Узнать подробнее</Button>
      </div>
    </article>
  );
};
