import React from 'react';
import styles from './section.module.scss';
import classNames from 'classnames';
import { Container, SectionTitle } from '@/components/shared';

interface Props {
  children: React.ReactNode;
  title?: string;
  titleAlign?: 'left' | 'center' | 'right';
}

export const Section: React.FC<Props> = ({
  children,
  title,
}) => {
  return (
    <section
      aria-label={title}
      className={classNames(styles.section)}
    >
      <Container>
        {title &&
          <div className={classNames(styles.header_wrapper)}>
            <SectionTitle>
              {title}
            </SectionTitle>
          </div>
        }

        {children}
      </Container>
    </section>
  );
};
