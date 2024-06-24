import classes from './GeneralInfo.module.css';
import Section from '../../components/Section/Section';
import Container from '../../components/Container/Container';
import Price from '../../components/Price/Price';
import StarRating from '../../components/StarRating/StarRating';
import Layout from '../../components/Layout/Layout';

const GeneralInfo = (props) => {
  return (
    <Section>
      <Container>
        <div className={classes.wrapper}>
          <h1 className={classes.title}>
            Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.
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
                3.71
              </span>

              <div className={classes.stars}>
                <StarRating rating={3.71}/>
              </div>

              <span className={classes.users}>
                Оценки: 237881
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
              Action
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.cell}>
              Голос:
            </div>
            <div className={classes.cell}>
              Russian, English
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.cell}>
              Текст:
            </div>
            <div className={classes.cell}>
              Russian, English
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.cell}>
              Дата релиза:
            </div>
            <div className={classes.cell}>
              26.11.2019
            </div>
          </div>
        </div>
      </Layout>
    </Section>
  ); 
};

export default GeneralInfo;
