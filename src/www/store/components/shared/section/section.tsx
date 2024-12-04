import React from 'react';
import styles from './section.module.scss';
import classNames from 'classnames';
import { Container, SectionTitle } from '@/components/shared';

interface Props {
  id?: string;
  children: React.ReactNode;
  title?: string;
  titleAlign?: 'left' | 'center' | 'right';
  container?: boolean,
  className?: string,
}

export const Section: React.FC<Props> = ({
  id,
  children,
  title,
  container = true,
  className,
  titleAlign = 'left',
}) => {
  return (
    <section
      id={id}
      aria-label={title}
      className={classNames(
        styles.section,
        className
      )}
    >
      {title &&
        <Container>
          <SectionTitle
            position={titleAlign}
            className={classNames(styles.title)}
          >
            {title}
          </SectionTitle>
        </Container>
      }

      {container && <Container>{children}</Container> || children}

    </section>
  );
};
