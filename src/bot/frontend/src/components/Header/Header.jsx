import classes from './Header.module.css';
import Section from '../Section/Section';
import Container from '../Container/Container';
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className={classes.header}>
      <Section>
        <Container>
          <ul className={classes.list}>
            <li className={`${classes.item} ${classes.search}`}>
              <Link to='/search'>
                <div>
                  Поиск
                </div>
              </Link>
            </li>

            <li className={`${classes.item} ${classes.cart}`}>
              <Link to='/cart'></Link>
              <span className={classes.badge}>
                99
              </span>
            </li>

            <li className={`${classes.item} ${classes.profile}`}>
              <Link to='/user'></Link>
            </li>
          </ul>
        </Container>
      </Section>
    </header>
  );
};

export default Header;
