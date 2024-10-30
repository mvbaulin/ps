import { IGenre } from '@/types/filters';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import classNames from 'classnames';
import styles from './genre-card.module.scss';

interface Props {
  className?: string;
  genre: IGenre;
}

export const GenreCard: React.FC<Props> = ({
  className,
  genre
}) => {
  return (
    <Link
      href={genre.link}
      className={classNames(styles.card, className)}
    >
      <h2 className={classNames(styles.title)}>
        {genre.translation}
      </h2>

      <Image
        className={classNames(styles.image)}
        src={genre.image || ''}
        alt={genre.name}
        width={190}
        height={190}
      />
    </Link>
  );
};
