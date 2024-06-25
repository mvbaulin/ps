import classes from './GeneralInfo.module.css';
import Section from '../../components/Section/Section';
import Container from '../../components/Container/Container';
import Price from '../../components/Price/Price';
import StarRating from '../../components/StarRating/StarRating';
import Layout from '../../components/Layout/Layout';

const GeneralInfo = (props) => {
  const getFormatedDate = (date) => {
    if (date) {
      const formatedDate = new Date(date);
      return `${formatedDate.getDate()}.${(formatedDate.getMonth() + 1).toString().padStart(2, '0')}.${formatedDate.getFullYear()}`;
    }

    return '';
  }

  return (
    <Section>
      <Container>
        <div className={classes.wrapper}>
          <h1 className={classes.title}>
            {props.title}
          </h1>

          <div className={classes.grid}>
            <ul className={classes.prices}>
              <li className={`${classes.price} ${classes.main_price}`}>
                <Price
                  price={20000}
                  discount={10000}
                  showDiscount={false}
                />
              </li>
              <li className={classes.price}>
                <Price
                  price={22000}
                  discount={12000}
                  showDiscount={true}
                  showBadge={false}
                  badge="PS+"
                />
              </li>
              <li className={classes.price}>
                <Price
                  price={20000}
                  discount={10000}
                  showDiscount={true}
                  showBadge={false}
                  badge="UBISOFT+"
                />
              </li>
              <li className={classes.price}>
                <Price
                  price={20000}
                  discount={10000}
                  showDiscount={true}
                  showBadge={false}
                  badge="EA+"
                />
              </li>
              <li className={classes.price}>
                <Price
                  price={20000}
                  discount={10000}
                  showDiscount={true}
                  showBadge={false}
                  badge="GTA+"
                />
              </li>
            </ul>

            <div className={classes.ratings}>
              <span className={classes.rating}>
                {props.rating}
              </span>

              <div className={classes.stars}>
                <StarRating rating={props.rating}/>
              </div>

              <span className={classes.users}>
                Оценки: {props.users}
              </span>
            </div>
          </div>
        </div>
      </Container>

      <Layout>
        <div className={classes.table}>
          <div className={classes.row}>
            <div className={classes.cell}>
              Жанр:
            </div>
            <div className={classes.cell}>
              {props.genres}
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.cell}>
              Голос:
            </div>
            <div className={classes.cell}>
              {props.voice}
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.cell}>
              Текст:
            </div>
            <div className={classes.cell}>
              {props.screen_languages}
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.cell}>
              Дата релиза:
            </div>
            <div className={classes.cell}>
              {getFormatedDate(props.release_date)}
            </div>
          </div>
        </div>
      </Layout>
    </Section>
  ); 
};

export default GeneralInfo;
