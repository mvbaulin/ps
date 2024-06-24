import classes from './ReserveCodes.module.css';
import FormTitle from "../FormTitle/FormTitle";
import Input from "../Input/Input";
import {useStorage} from '../../hooks/useStorage';
import {useState, useEffect} from 'react';

const ReserveCodes = () => {
  const {getItem, setItem} = useStorage();
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [third, setThird] = useState('');
  const [fourth, setFourth] = useState('');

  useEffect(() => {
    setFirst(getItem('reserve_code_1') || '');
    setSecond(getItem('reserve_code_2') || '');
    setThird(getItem('reserve_code_3') || '');
    setFourth(getItem('reserve_code_4') || '');
  }, []);

  const handleFirstChange = (e) => {
    setFirst(e.target.value);
    setItem('reserve_code_1', e.target.value);
  }

  const handleSecondChange = (e) => {
    setSecond(e.target.value);
    setItem('reserve_code_2', e.target.value);
  }

  const handleThirdChange = (e) => {
    setThird(e.target.value);
    setItem('reserve_code_3', e.target.value);
  }

  const handleFourthChange = (e) => {
    setFourth(e.target.value);
    setItem('reserve_code_4', e.target.value);
  }

  return (
    <section className={classes.codes}>
      <FormTitle>Резервные коды</FormTitle>

      <div className={classes.wrapper}>
        <Input
          value={first}
          onChange={handleFirstChange}
          placeholder="1."
          upper="true"
          />

        <Input
          value={third}
          onChange={handleThirdChange}
          placeholder="3."
          upper="true"
          />

        <Input
          value={second}
          onChange={handleSecondChange}
          placeholder="2."
          upper="true"
          />

        <Input
          value={fourth}
          onChange={handleFourthChange}
          placeholder="4."
          upper="true"
          />
      </div>
    </section>
  );
};

export default ReserveCodes;
