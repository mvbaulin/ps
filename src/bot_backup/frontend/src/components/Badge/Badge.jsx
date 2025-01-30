import classes from './Badge.module.css';

const Badge = ({children, modificator}) => {
  let styles = `${classes.badge}`;

  if (modificator == 'PS+') {
    styles = `${classes.badge} ${classes.ps_extra}`;
  }
  else if (modificator == 'UBISOFT+') {
    styles = `${classes.badge} ${classes.ubisoft}`;
  }
  else if (modificator == 'GTA+') {
    styles = `${classes.badge} ${classes.gta}`;
  }
  else if (modificator == 'EA+') {
    styles = `${classes.badge} ${classes.ea}`;
  }

  return (
    <span className={styles}>
      {children}
    </span>
  );
};

export default Badge;
