import { Link } from "react-router-dom";
import classes from './Item.module.css';
import Price from '../Price/Price';

const Item = (props) => {
  const {
    title,
    url,
    price,
    discount,
    img
  } = props;
  
  return (
    <li className={classes.item}>
      <Link to={url} className={classes.link}>
        <img src={img} className={classes.img}/>

        <div className={classes.inner}>
          <Price
            price={price}
            discount={discount}
            showDiscount={false}
          />

          <p className={classes.name}>
            {title}
          </p>
        </div>
      </Link>
    </li>
  );
};

export default Item;
