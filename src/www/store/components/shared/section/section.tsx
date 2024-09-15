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
  className,
  titleAlign = 'left'
}) => {
  return (
    <section
      aria-label={title}
      className={classNames(styles.section, className)}
    >
      <Container>
        {title &&
          <SectionTitle
            position={titleAlign}
            className={classNames(styles.title)}
          >
            {title}
          </SectionTitle>
        }
      </Container>

      {container && <Container>{children}</Container> || children}

    </section>
  );
};
