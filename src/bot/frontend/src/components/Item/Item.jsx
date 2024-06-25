import { Link } from "react-router-dom";
import classes from './Item.module.css';
import Price from '../Price/Price';

const Item = (props) => {
  return (
    <li className={classes.item}>
      <Link to={`/title/${props.id}`} className={classes.link}>
        <img src={props.cover} className={classes.img}/>

        <div className={classes.inner}>
          <Price
            price={props.offer_none_original_price}
            discount={props.offer_none_discount_price}
            showDiscount={false}
          />

          <p className={classes.name}>
            {props.title}
          </p>
        </div>
      </Link>
    </li>
  );
};

export default Item;
