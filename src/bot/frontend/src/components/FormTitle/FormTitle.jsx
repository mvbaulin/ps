import classes from './FormTitle.module.css';

const FormTitle = ({children}) => {
  return (
    <>
      <h2 className={classes.title}>{children}</h2>
    </>
  );
};

export default FormTitle;
