import React from 'react';
import classNames from 'classnames';
import styles from './toggle.module.scss';

interface Props {
  className?: string;
  label: string;
}

export const Toggle: React.FC<Props> = ({
  className,
  label
}) => {
  return (
    <div className={classNames(styles.toggle, className)}>
      <label className={classNames(styles.wrapper)}>
        <span
          className={classNames(styles.label)}>
            {label}
        </span>

        <input
          className={classNames(styles.input, 'visually-hidden')}
          type="checkbox" />

        <span
          className={classNames(styles.slider)}>
        </span>
      </label>
    </div>
  );
};
