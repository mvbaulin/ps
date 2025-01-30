import classes from './Choiser.module.css';
import FormTitle from "../FormTitle/FormTitle";
import {useState, useEffect} from 'react';
import {useStorage} from '../../hooks/useStorage';

const Choiser = ({onAccountChange}) => {
  const {setItem, getItem} = useStorage();
  const [account, setAccount] = useState(true);

  useEffect(() => {
    setAccount(getItem('buy_on_user_account'), 'user');
  }, [])

  const handleClickAccount = (choise) => {
    setAccount(choise);
    setItem('buy_on_user_account', choise);
    onAccountChange(choise);
  };

  return (
    <section className={classes.choiser}>
      <FormTitle>Куда оформить заказ?</FormTitle>

      <div className={classes.selecting}>
        <button
          className={`${classes.button} ${account === 'user' ? classes.active : ''}`}
          onClick={() => handleClickAccount('user')}>
          У меня есть учетная запись
        </button>

        <button
          className={`${classes.button} ${account === 'new' ? classes.active : ''}`}
          onClick={() => handleClickAccount('new')}>
          У меня нет учетной записи
        </button>
      </div>
    </section>
  );
};

export default Choiser;
