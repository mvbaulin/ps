import Section from '../Section/Section';
import Slider from '../Slider/Slider';

const Selection = ({title, items = []}) => {
  return (
    <Section title={title}>
      <Slider items={items} />
    </Section>
  );
};

export default Selection;
