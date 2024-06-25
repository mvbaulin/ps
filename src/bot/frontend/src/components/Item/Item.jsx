import { Link } from "react-router-dom";
import classes from './Item.module.css';
import Price from '../Price/Price';

const Item = (props) => {
  return (
    <li className={classes.item}>
      <Link to={`/title/${props.id}`} className={classes.link}>
        <img src={props.cover} className={classes.img}/>

        <div className={classes.inner}>
          {props.offer_none_original_price || props.offer_none_discount_price ? (
            <Price
              price={props.offer_none_original_price}
              discount={props.offer_none_discount_price}
              showDiscount={false}
            />
          ) : props.ps_plus_original_price || props.ps_plus_discount_price ? (
            <Price
              price={props.ps_plus_original_price}
              discount={props.ps_plus_discount_price}
              showDiscount={false}
              badge="PS+"
            />
          ) : props.gta_plus_original_price || props.gta_plus_discount_price ? (
            <Price
              price={props.gta_plus_original_price}
              discount={props.gta_plus_discount_price}
              showDiscount={false}
              badge="GTA+"
            />
          ) : props.ea_access_original_price || props.ea_access_discount_price ? (
            <Price
              price={props.ea_access_original_price}
              discount={props.ea_access_discount_price}
              showDiscount={false}
              badge="EA+"
            />
          ) : props.ubisoft_plus_original_price || props.ubisoft_plus_discount_price ? (
            <Price
              price={props.ubisoft_plus_original_price}
              discount={props.ubisoft_plus_discount_price}
              showDiscount={false}
              badge="UBISOFT+"
            />
          ) : null
          }

          <p className={classes.name}>
            {props.title}
          </p>
        </div>
      </Link>
    </li>
  );
};

export default Item;
