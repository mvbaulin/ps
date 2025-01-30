import classes from './Price.module.css';
import Badge from '../Badge/Badge';

const Price = ({price, discount, showBadge=true, showDiscount=true, badge}) => {

  const getPercent = (price, discount) => {
    return -(100 - ((discount / price) * 100).toFixed(0));
  }

  const hasDiscount = (price, discount) => {
    return price !== discount && showDiscount;
  }

  return (
    <div className={classes.price}>
      {hasDiscount(price, discount) ?
        <>
          <span className={classes.original_price}>
            {price} ₽
          </span>
          <span>
            {discount} ₽
          </span>
        </>
        :
        <span>
          {discount} ₽
        </span>
      }

      {badge && <Badge modificator={badge}>{badge}</Badge>}

      {showBadge && getPercent(price, discount) ?
        <Badge>{getPercent(price, discount)}%</Badge>
        :
        null
      }

    </div>
  );
};

export default Price;
