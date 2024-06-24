import classes from './Reciept.module.css';
import FormTitle from "../FormTitle/FormTitle";
import Checkbox from "../Checkbox/Checkbox";
import Input from "../Input/Input";
import {useStorage} from '../../hooks/useStorage';
import {useState, useEffect} from 'react';
import {useValidation} from '../../hooks/useValidation';

const Reciept = () => {
  const {validateEmail} = useValidation();
  const {setItem, getItem} = useStorage();
  const [sameEmails, setSameEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    const storedSameEmail = getItem('same_email');
    setSameEmail(storedSameEmail !== null ? JSON.parse(storedSameEmail) : false);
    setEmail(getItem('reciept_email') || '');
    validateEmail(email, setEmailError);
  }, [email]);

  const handleSameEmailsChange = (e) => {
    const isChecked = e.target.checked;
    setSameEmail(isChecked);
    setItem('same_email', JSON.stringify(isChecked));
    if (!isChecked) {
      setEmail('');
      setItem('reciept_email', '');
      setEmailError('');
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setItem('reciept_email', e.target.value);
    validateEmail(e.target.value, setEmailError);
  };

  return (
    <section className={classes.reciept}>
      <FormTitle>Чек</FormTitle>

      <div className={classes.wrapper}>
        <Checkbox
          checked={sameEmails}
          onChange={handleSameEmailsChange}
        >E-mail для чека такой же, как логин
        </Checkbox>

        {sameEmails &&
          <Input
            value={email}
            onChange={handleEmailChange}
            placeholder="Введите e-mail для чека"
            error={emailError}
            type="email"
          />
        }
      </div>

    </section>
  );
};

export default Reciept;
