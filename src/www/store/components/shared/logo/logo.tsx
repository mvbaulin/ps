import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import styles from './logo.module.scss';
import classNames from 'classnames';

export const Logo: React.FC = () => {
  return (
    <Link
      href="/"
      className={classNames(styles.logo)}
      aria-label="PS Store"
    >
      <Image
        src="/logo-mobile.svg"
        alt="PS Store"
        width={110}
        height={38}
        className={classNames(classNames(styles['image--mobile']))}
        />

      <Image
        src="/logo.svg"
        alt="PS Store"
        width={194}
        height={44}
        className={classNames(classNames(styles['image--desktop']))}
      />

    </Link>
  );
};
