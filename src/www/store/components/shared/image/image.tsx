import React from 'react';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import classNames from 'classnames';
import styles from './image.module.scss';

interface Props extends NextImageProps {
  className?: string;
  width?: number;
  height?: number;
  fetchpriority?: boolean;
  cropped?: boolean;
  background?: boolean;
}

export const Image: React.FC<Props> = ({
  className,
  width = 1920,
  height = 1080,
  src,
  fetchpriority = true,
  cropped = false,
  background = true,
  ...rest
}) => {
  const isSquare = width === height;

  return (
    <div
      className={classNames(
        styles.wrapper,
        !background && styles['wrapper--no-background'],
        className
      )}>

      {background &&
        <div className={styles.background}>
          <NextImage
            src={src}
            alt=""
            width={width / 4}
            height={height / 4}
            className={classNames(styles.blurred)}
            loading={fetchpriority ? 'eager' : 'lazy'}
          />
        </div>
      }

      <div
        className={classNames(styles.inner, {
          [styles['image-wrapper--square']]: isSquare
        })}
      >
        <NextImage
          {...rest}
          src={src}
          width={width}
          height={height}
          className={classNames(styles.image, {
            [styles['image--cropped']]: cropped
          })}
          priority={fetchpriority}
          loading={fetchpriority ? 'eager' : 'lazy'}
        />
      </div>
    </div>
  );
};
