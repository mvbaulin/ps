import React from 'react';
import classNames from 'classnames';
import styles from './avatar.module.scss';
import Image from 'next/image';

interface Props {
  image: string;
}

export const Avatar: React.FC<Props> = ({ image }) => {
  return (
    <div className={classNames(styles.wrapper)}>
      <Image
        src={image}
        alt="Avatar"
        width={60}
        height={60}
        className={classNames(styles.image)}
      />
    </div>
  );
};
