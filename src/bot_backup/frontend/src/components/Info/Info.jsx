import classes from './Info.module.css';

const Info = ({children}) => {
  return (
    <p className={classes.info}>
      {children}
    </p>
  );
};

export default Info;
