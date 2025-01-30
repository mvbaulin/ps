import classes from './Input.module.css';

const Input = (props) => {
  let styles = classes.input;

  let {value} = props;

  if (props.value && !props.error) {
    styles = `${classes.input} ${classes.success}`;
  }
  
  if (props.error) {
    styles = `${classes.input} ${classes.error}`;
  }

  if (props.upper) {
    value = props.value.toUpperCase();
  }

  return (
    <>
      <input
        className={styles}
        {...props}
        value={value}
        >
      </input>

      {props.error &&
        <span className={classes.error_message}>
          {props.error}
        </span>
      }
    </>
  );
};

export default Input;
