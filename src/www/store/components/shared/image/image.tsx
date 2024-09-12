import React from 'react';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import classNames from 'classnames';
import styles from './image.module.scss';

interface Props extends NextImageProps {
  className?: string
}

export const Image: React.FC<Props> = ({ className, ...rest }) => {
  return (
    <NextImage
      {...rest}
      className={classNames(styles.image, className)}
    />
  );
};
