'use client'

import React from 'react';
import classNames from 'classnames';
import styles from './section-promo.module.scss';
import { Container, Image } from '@/components/shared';
import { useKeenSlider, KeenSliderInstance } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { Icon } from '@/components/ui';

const images = [
  "/promo1.jpeg",
  "/promo2.jpeg",
  "/promo3.jpeg",
]

export const SectionPromo: React.FC = () => {
  const [opacities, setOpacities] = React.useState<number[]>([]);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [sliderInstance, setSliderInstance] = React.useState<KeenSliderInstance | null>(null);

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    slides: images.length,
    loop: true,
    drag: true,
    detailsChanged(s) {
      const new_opacities = s.track.details.slides.map((slide) => slide.portion)
      setOpacities(new_opacities)
      setCurrentSlide(s.track.details.rel);
    },
    created(s) {
      setSliderInstance(s);
    },
  })

  const buttons = (
    <>
      <button
        className={classNames(styles.arrow, styles['arrow--left'])}
        onClick={() => sliderInstance?.prev()}
      >
        <Icon
          className={classNames(styles.icon)}
          name="left"
        />
      </button>

      <button
        className={classNames(styles.arrow, styles['arrow--right'])}
        onClick={() => sliderInstance?.next()}
      >
        <Icon
          className={classNames(styles.icon)}
          name="right"
        />
      </button>
    </>
  );

  const dots = (
    <>
      <div className={classNames(styles.dots)}>
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => sliderInstance?.moveToIdx(idx)}
            className={classNames(styles.dot, {
              [styles['dot--active']]: idx === currentSlide
            })}
          />
        ))}
      </div>
    </>
  )

  return (
    <section className={classNames(styles.promo)}>
      <div ref={sliderRef} className={classNames(styles.list)}>
        {images.map((src, idx) => (
          <div
            key={idx}
            className={classNames(styles.item)}
            style={{ opacity: opacities[idx] }}
          >
            <Image
              className={classNames(styles.image)}
              src={src}
              alt="Promo"
            />
          </div>
        ))}
      </div>


      {buttons}

      {dots}

    </section>
  )
};
