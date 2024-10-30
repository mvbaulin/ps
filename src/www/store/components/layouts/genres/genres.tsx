'use client';

import React, { useEffect } from 'react';
import classNames from 'classnames';
import styles from './genres.module.scss';
import { GenreCard, Section } from '@/components/shared';
import { useGenres } from '@/storage/zustand';

interface Props {
  className?: string;
}

export const Genres: React.FC<Props> = ({
  className,
}) => {
  const { genres, fetchGenres } = useGenres();
    useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);

  console.log(genres);

  return (
    <Section
      title="Жанры"
    >
      <div className={classNames(styles.wrapper, className)}>
        {genres.map((genre) => (
          <GenreCard
            key={genre.id}
            genre={genre}
            className={styles.card}
          />
        ))}
      </div>
    </Section>
  );
};
