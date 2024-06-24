import classes from './TitleCover.module.css';

const TitleCover = ({coverUrl, platform_ps4, platform_ps5}) => {
  return (
    <section className={classes.cover}>
      <img
        className={classes.blur}
        src={coverUrl}
      />
      <img
        className={classes.img}
        src={coverUrl}
      />

      {(platform_ps4 || platform_ps5) &&
        <ul className={classes.platforms}>
          {platform_ps4 &&
            <li className={classes.platform}>
              <img src="/icons/ps4.svg" />
            </li>
          }
          {platform_ps5 &&
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
