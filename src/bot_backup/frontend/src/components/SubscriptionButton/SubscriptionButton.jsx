import {Link} from 'react-router-dom';
import classes from './SubscriptionButton.module.css';
import Price from '../Price/Price';

const SubscriptionButton = (props) => {
  const url = props?.url;
  const months = props?.months;
  const price = props?.price;
  const discount = props?.discount;
  const type = props.type;

  const styles = `${classes.button} ${classes[type]}`;

  return (
    <Link
      to={url}
      className={styles}
    >
      <div className={classes.wrapper}>
        <div className={classes.inner}>
          <Price
            price={price}
            discount={discount}
            showDiscount={false}
          />
        </div>
        <div className={classes.inner}>
          <span>
            {months}-меc. подписка
          </span>
        </div>
      </div>

    </Link>
  );
};

export default SubscriptionButton;
