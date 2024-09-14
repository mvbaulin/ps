import React from 'react';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import classNames from 'classnames';
import styles from './image.module.scss';

interface Props extends NextImageProps {
  className?: string;
  width?: number;
  height?: number;
  fetchpriority?: boolean;
  square?: boolean;
}

export const Image: React.FC<Props> = ({
  className,
  width = 1920,
  height = 1080,
  src,
  fetchpriority = true,
  ...rest
}) => {
  const isSvg = typeof src === 'string' && (src.endsWith('.svg') || src.endsWith('.png'));

  return (
    <NextImage
      {...rest}
      src={src}
      className={classNames(styles.image, className, {
        [styles['image--no-background']]: isSvg
      })}
      width={width}
      height={height}
      priority={fetchpriority}
      loading={fetchpriority ? 'eager' : 'lazy'}
    />
  );
};
