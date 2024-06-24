import classes from './StarRating.module.css';

const StarRating = ({rating}) => {
  if (rating > 5) {
    rating = 5;
  }

  const fullStarsCount = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStarsCount = 5 - fullStarsCount - (halfStar ? 1 : 0);

  return (
    <ul className={classes.stars}>
      {Array.from({length: fullStarsCount}, (_, idx) => (
        <li key={idx} className={classes.full}></li>
      ))}

      {halfStar && <li key={fullStarsCount} className={classes.half}></li>}

      {Array.from({length: emptyStarsCount}, (_, idx) => (
        <li key={idx + fullStarsCount + (halfStar ? 1 : 0)} className={classes.empty}></li>
      ))}
    </ul>
  );
};

export default StarRating;
