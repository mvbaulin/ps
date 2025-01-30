import classes from './Promocode.module.css';
import FormTitle from "../FormTitle/FormTitle";
import Input from "../Input/Input";
import {useStorage} from '../../hooks/useStorage';
import {useState, useEffect} from 'react';

const Promocode = () => {
  const {setItem, getItem} = useStorage();
  const [promo, setPromo] = useState('');

  useEffect(() => {
    setPromo(getItem('promocode') || '');
  }, );

  const handlePromoChange = (e) => {
    setPromo(e.target.value);
    setItem('promocode', e.target.value);
  };

  return (
    <section className={classes.reciept}>
      <FormTitle>Промокод</FormTitle>

      <div className={classes.wrapper}>
        <Input
          value={promo}
          onChange={handlePromoChange}
          placeholder="Введите промокод (если есть)"
        />
      </div>

    </section>
  );
};

export default Promocode;
