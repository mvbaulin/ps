import Link from 'next/link';
import React from 'react';
import { Image } from '@/components/shared';
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
        src="/logo.svg"
        alt="PS Store"
        width={36}
        height={36}
      />
    </Link>
  );
};
