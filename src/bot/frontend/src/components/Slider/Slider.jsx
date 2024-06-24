import classes from './Slider.module.css';
import Item from '../Item/Item';

const Slider = ({items}) => {
  return (
    <div className={classes.slider}>
      <ul className={classes.window}>
        {
          items.map((item) => {
            return (
              <Item
                key={item.id}
                img={item.img}
                title={item.title}
                price={item.price}
                discount={item.discount}
                url={item.url}
              />
            )
          })
        }
      </ul>
    </div>
  );
};

export default Slider;
