import React from 'react';
import styles from './section.module.scss';
import classNames from 'classnames';
import { Container, SectionTitle } from '@/components/shared';

interface Props {
  children: React.ReactNode;
  title?: string;
  titleAlign?: 'left' | 'center' | 'right';
  container?: boolean,
  className?: string
}

export const Section: React.FC<Props> = ({
  children,
  title,
  container = true,
  className
}) => {
  return (
    <section
      aria-label={title}
      className={classNames(styles.section, className)}
    >
      <Container>
        {title &&
          <div className={classNames(styles.header_wrapper)}>
            <SectionTitle>
              {title}
            </SectionTitle>
          </div>
        }
      </Container>

      {container && <Container>{children}</Container> || children}

    </section>
  );
};
