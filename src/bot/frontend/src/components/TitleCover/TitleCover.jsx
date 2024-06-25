import classes from './TitleCover.module.css';
import {useState} from 'react';

const TitleCover = ({cover, platforms = ''}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  let platformsArr = platforms ? platforms.split(',') : [];

  const pl = {
    ps4: platformsArr.includes('PS4'),
    ps5: platformsArr.includes('PS5'),
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <section className={classes.cover}>
      <img className={classes.blur} src={cover} />
      <img
        className={`${classes.img} ${imageLoaded ? classes.fade_in : ''}`}
        src={cover}
        onLoad={handleImageLoad}
        alt="Cover"
      />

      {(pl.ps4 || pl.ps5) &&
        <ul className={classes.platforms}>
          {pl.ps4 &&
            <li className={classes.platform}>
              <img src="/icons/ps4.svg" />
            </li>
          }
          {pl.ps5 &&
            <li className={classes.platform}>
              <img src="/icons/ps5.svg" />
            </li>
          }
        </ul>
      }
    </section>
  );
};

export default TitleCover;
