'use client';

import React, { useRef, useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './promo.module.scss';
import { Image } from '@/components/shared';
import { ITitle } from '@/types/title';
import { Button, Icon } from '@/components/ui';
import { getPrice } from '@/lib/common';

interface Props {
  interval?: number;
  titles: ITitle[];
}

export const Promo: React.FC<Props> = ({
  interval = 30000,
  titles,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const startX = useRef<number | null>(null);
  const slideInterval = useRef<NodeJS.Timeout | null>(null);

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % titles.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + titles.length) % titles.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    slideInterval.current = setInterval(goToNextSlide, interval);

    return () => {
      if (slideInterval.current) clearInterval(slideInterval.current);
    };
  }, [currentSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    const endX = e.changedTouches[0].clientX;
    const diffX = startX.current - endX;

    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        goToNextSlide();
      } else {
        goToPrevSlide();
      }
    }
    startX.current = null;
  };

  return (
    <section
      className={classNames(styles.promo)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className={classNames(styles.list)}>
        {titles.map((title, idx) => (
          <div
            key={title.id}
            className={classNames(styles.item, {
              [styles['item--active']]: idx === currentSlide,
            })}
            style={{ opacity: idx === currentSlide ? 1 : 0 }}
          >
            <Image
              className={classNames(styles.image)}
              src={title.background || ''}
              alt={title.title || title.id}
              priority={true}
              width={2160}
              height={1080}
              cropped
            />

            <div className={classNames(styles.content)}>
              <div className={classNames(styles.title)}>{title.title}</div>

              <div className={classNames(styles.button)}>
                <Button
                  type="link"
                  href={`/catalog/titles/${title.id}`}
                  color="tetriary"
                >
                  {getPrice(title?.offerNoneOriginalPrice, title.offerNoneDiscountPrice).price}{' '}
                  {getPrice(title?.offerNoneOriginalPrice, title.offerNoneDiscountPrice).currency}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={classNames(styles.controls)}>
        <button
          onClick={goToPrevSlide}
          className={classNames(styles.control, styles['control--prev'])}
        >
          <Icon className={classNames(styles.icon)} name="left" />
        </button>
        <button
          onClick={goToNextSlide}
          className={classNames(styles.control, styles['control--next'])}
        >
          <Icon className={classNames(styles.icon)} name="right" />
        </button>
      </div>

      <div className={classNames(styles.dots)}>
        {titles.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={classNames(styles.dot, {
              [styles['dot--active']]: idx === currentSlide,
            })}
          />
        ))}
      </div>
    </section>
  );
};
