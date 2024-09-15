import React from 'react';
import { Section, TitleCard, Carousel } from '@/components/shared';
import ITitle from '@/types/title';

interface Props {
  title: string;
  items: ITitle[];
}

export const Selection: React.FC<Props> = ({
  items,
  title
}) => {

  return (
    <Section title={title} container={false}>
      <Carousel>
        {items.map((item, index) => (
          <TitleCard
            key={index}
            title={item}
          />
        ))}
      </Carousel>
    </Section>
  );
};
