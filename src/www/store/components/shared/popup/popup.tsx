import React from 'react';
import classNames from 'classnames';
import styles from './popup.module.scss';

interface Props {
  className?: string;
}

export const Popup: React.FC<Props> = ({
  className
}) => {
  return (
    <div className={classNames(styles.popup, className)}>
      sfsf
    </div>
  );
};
