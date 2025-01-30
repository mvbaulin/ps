import classes from './Layout.module.css';
import Container from '../Container/Container'

const Layout = ({children}) => {
  return (
    <section className={classes.layout}>
      <Container>
        <div className={classes.inner}>
          {children}
        </div>
      </Container>
    </section>
  );
};

export default Layout;
