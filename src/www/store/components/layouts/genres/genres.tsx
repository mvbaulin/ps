import React from 'react';
import classNames from 'classnames';
import styles from './genres.module.scss';
import { GenreCard, Section } from '@/components/shared';
import { IGenre } from '@/types/filters';

interface Props {
  items: IGenre[];
  className?: string;
}

export const Genres: React.FC<Props> = ({
  items,
  className,
}) => {
  return (
    <Section
      title="Жанры"
    >
      <div className={classNames(styles.wrapper, className)}>
        {items.map((genre) => (
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
