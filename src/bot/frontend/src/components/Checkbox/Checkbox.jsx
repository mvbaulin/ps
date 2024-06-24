import classes from './Checkbox.module.css';

const Checkbox = ({ checked, onChange, children }) => {
  let styles = classes.checkbox;

  if (checked) {
    styles += ` ${classes.checked}`;
  }
  
  return (
    <div className={styles}>
      <label className={classes.label}>
        <input
          checked={!!checked}
          onChange={onChange}
          type="checkbox"
          className={classes.input}
        />
        {children}
      </label>
    </div>
  );
};

export default Checkbox;
