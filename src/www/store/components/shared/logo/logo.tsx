import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import styles from './logo.module.scss';
import classNames from 'classnames';

interface Props {
  width: number;
  height: number;
}

export const Logo: React.FC<Props> = ({ width, height }) => {
  return (
    <Link
      href="/"
      className={classNames(styles.logo)}
      style={{ width, height }}
      aria-label="PS Store"
    >

      <Image
        src="/logo.svg"
        alt="PS Store"
        width={width}
        height={height}
      />
    </Link>
  );
};
