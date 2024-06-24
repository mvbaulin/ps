import classes from './Section.module.css';
import SectionTitle from '../SectionTitle/SectionTitle';

const Section = ({children, title, additional}) => {
  return (
    <section className={classes.section}>
      <header className={classes.wrapper}>
        {title &&
          <SectionTitle>
            {title}
          </SectionTitle>
        }

        {additional &&
          <SectionTitle>
            {additional}
          </SectionTitle>
        }
      </header>

      {children}
    </section>
  );
};

export default Section;
