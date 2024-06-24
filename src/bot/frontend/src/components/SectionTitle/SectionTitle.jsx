import classes from './SectionTitle.module.css';
import Container from '../Container/Container';

const SectionTitle = ({children}) => {
  return (
    <h2 className={classes.section_title}>
      <Container>
        {children}
      </Container>
    </h2>
  );
};

export default SectionTitle;
