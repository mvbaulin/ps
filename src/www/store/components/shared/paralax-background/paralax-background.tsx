'use client';

import React, { useEffect, useState } from 'react';
import styles from './paralax-background.module.scss';

interface Props {
  image: string;
}

export const ParalaxBackground: React.FC<Props> = ({ image }) => {
  const [offset, setOffset] = useState(0);

  const handleScroll = () => {
    const scrollHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPosition = window.pageYOffset;
    const newOffset = (scrollPosition / scrollHeight) * 100;
    setOffset(newOffset);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={styles.paralax}
      style={{
        backgroundImage: `url(${image})`,
        transform: `translateX(${offset * -1}vw)`,
      }}
    ></div>
  );
};
