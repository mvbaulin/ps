import TitleCover from '../TitleCover/TitleCover';
import Container from "../Container/Container";
import Price from "../Price/Price";
import classes from './CartItem.module.css';

const CartItem = (props) => {
  return (
    <li className={classes.item}>
      <Container>
        <div className={classes.wrapper}>
          <div className={classes.inner}>
            <div className={classes.cover}>
              {/* <TitleCover
                coverUrl={props.cover}
              /> */}
            </div>

            <div className={classes.info}>
              <Price
                price={props.price}
                discount={props.discount}
                showDiscount={false}
                showBadge={true}
              />

              <p className={classes.title}>
                {props.title}
              </p>

              <ul className={classes.platforms}>
                {props.platform_ps4 &&
                  <li className={classes.platform}>
                    <img
                      src="/icons/ps4_mini.svg"
                      width="23"
                      height="5"
                    />
                  </li>
                }

                {props.platform_ps5 &&
                  <li className={classes.platform}>
                    <img
                      src="/icons/ps5_mini.svg"
                      width="23"
                      height="5"
                    />
                  </li>
                }
              </ul>
            </div>
          </div>

          <button className={classes.remove}></button>
        </div>

      </Container>
    </li>
  );
};

export default CartItem;
