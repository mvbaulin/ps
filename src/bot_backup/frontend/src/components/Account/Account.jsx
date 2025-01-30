import classes from './Account.module.css';
import FormTitle from "../FormTitle/FormTitle";
import Input from "../Input/Input";
import {useStorage} from '../../hooks/useStorage';
import {useState, useEffect} from 'react';
import {useValidation} from '../../hooks/useValidation';

const Account = () => {
  const {getItem, setItem} = useStorage();
  const {validateEmail, validatePassword} = useValidation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    setEmail(getItem('email') || '');
    setPassword(getItem('password') || '');
    setConfirmPassword(getItem('confirmPassword') || '');
    validateEmail(email, setEmailError)
    validatePassword(password, confirm, setPasswordError);
  }, [email]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setItem('email', e.target.value);
    validateEmail(e.target.value, setEmailError);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setItem('password', e.target.value);
    validatePassword(e.target.value, confirmPassword, setPasswordError);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setItem('confirmPassword', e.target.value);
    validatePassword(password, e.target.value, setPasswordError);
  };

  return (
    <section className={classes.account}>
      <FormTitle>Данные учётной записи</FormTitle>

      <div className={classes.wrapper}>
        <Input
          value={email}
          onChange={handleEmailChange}
          placeholder="Введите e-mail"
          error={emailError}
          type="email"
        />

        <Input
          value={password}
          onChange={handlePasswordChange}
          placeholder="Введите пароль"
          type="text"
        />

        <Input
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          placeholder="Введите пароль еще раз"
          error={passwordError}
          type="text"
        />
      </div>
    </section>
  );
};

export default Account;
