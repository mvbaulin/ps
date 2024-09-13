'use client'

import React from 'react';
import classNames from 'classnames';
import styles from './section-promo.module.scss';
import { Image } from '@/components/shared';
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

const images = [
  "/promo1.jpeg",
  "/promo2.jpeg",
  "/promo3.jpeg",
]

export const SectionPromo: React.FC = () => {
  const [opacities, setOpacities] = React.useState<number[]>([])

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    slides: images.length,
    loop: true,
    detailsChanged(s) {
      const new_opacities = s.track.details.slides.map((slide) => slide.portion)
      setOpacities(new_opacities)
    },
  })


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
              width={1920}
              height={1080}
            />
          </div>
        ))}
      </div>
    </section>
  )
};
