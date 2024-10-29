import React from 'react';
import classNames from 'classnames';
import styles from './catalog-grid.module.scss';
import { ITitle } from '@/types/title';
import { TitleCard } from '@/components/shared';
import { Button } from '@/components/ui';

interface Props {
  className?: string;
  titles: ITitle[];
  onLoadMore: () => void;
  hasMore: boolean;
}

export const CatalogGrid: React.FC<Props> = ({
  className,
  titles,
  onLoadMore,
  hasMore,
}) => {
  return (
    <div className={classNames(styles.wrapper, className)}>
      <div className={styles.catalog}>
        {titles.map((title) => (
          <TitleCard
            title={title}
            responsive
            key={title.id}
          />
        ))}
      </div>

      {hasMore && (
        <div className={styles.inner}>
          <Button
            onClick={onLoadMore}
            className={styles.loadMore}
            color="secondary"
            bordered
          >
            Загрузить еще
          </Button>
        </div>
      )}
    </div>
  );
};
