import React from 'react';
import classNames from 'classnames';
import styles from './table.module.scss';

interface Column {
  label: string;
}

interface RowData extends Record<string, any> {
  state?: 'success' | 'warning' | 'danger';
}

interface Props {
  columns: Column[];
  data: RowData[];
}

export const Table: React.FC<Props> = ({ columns, data }) => {
  const keys = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className={classNames(styles.table)}>
      <div className={classNames(styles.header)}>
        {columns.map((column, index) => (
          <div key={index} className={styles.cell}>
            {column.label}
          </div>
        ))}
      </div>

      <div className={styles.body}>
        {data.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={classNames(styles.row, styles[`row--${row.state}`])}
          >
            {keys.map((key, index) => (
              <div key={index} className={classNames(styles.cell)}>
                {row[key]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
