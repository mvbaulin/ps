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
                {...item}
              />
            )
          })
        }
      </ul>
    </div>
  );
};

export default Slider;
