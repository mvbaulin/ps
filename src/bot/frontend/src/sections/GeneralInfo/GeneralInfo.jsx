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

    return '—';
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
              {props.has_offer_none === 1 &&
                <li className={`${classes.price} ${classes.main_price}`}>
                  <Price
                    price={props.offer_none_original_price}
                    discount={props.offer_none_discount_price}
                    showDiscount={false}
                  />
                </li>
              }

              {props.has_ps_plus === 1 &&
                <li className={classes.price}>
                  <Price
                    price={props.ps_plus_original_price}
                    discount={props.ps_plus_discount_price}
                    showDiscount={true}
                    showBadge={false}
                    badge="PS+"
                  />
                </li>
              }

              {props.has_ubisoft_plus === 1 &&
                <li className={classes.price}>
                  <Price
                    price={props.ubisoft_plus_original_price}
                    discount={props.ubisoft_plus_discount_price}
                    showDiscount={true}
                    showBadge={false}
                    badge="UBISOFT+"
                  />
                </li>
              }

              {props.has_gta_plus === 1 &&
                <li className={classes.price}>
                  <Price
                    price={props.gta_plus_original_price}
                    discount={props.gta_plus_discount_price}
                    showDiscount={true}
                    showBadge={false}
                    badge="GTA+"
                  />
                </li>
              }

              {props.has_ea_access === 1 &&
                <li className={classes.price}>
                  <Price
                    price={props.ea_access_original_price}
                    discount={props.ea_access_discount_price}
                    showDiscount={true}
                    showBadge={false}
                    badge="EA+"
                  />
                </li>
              }
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

      <div className={classes.info_wrapper}>
        <Layout>
          <div className={classes.table}>
            <div className={classes.row}>
              <div className={classes.cell}>
                Платформы:
              </div>
              <div className={classes.cell}>
                {
                  props.platforms ? props.platforms : '—'
                }
              </div>
            </div>

            <div className={classes.row}>
              <div className={classes.cell}>
                Жанр:
              </div>
              <div className={classes.cell}>
                {
                  props.genres ? props.genres : '—'
                }
              </div>
            </div>

            <div className={classes.row}>
              <div className={classes.cell}>
                Голос:
              </div>
              <div className={classes.cell}>
                {
                  props.voice ? props.voice : '—'
                }
              </div>
            </div>

            <div className={classes.row}>
              <div className={classes.cell}>
                Текст:
              </div>
              <div className={classes.cell}>
                {
                  props.screen_languages ? props.screen_languages : '—'
                }
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
      </div>
    </Section>
  ); 
};

export default GeneralInfo;
