export function useValidation() {
  const validateEmail = (email, setEmailError) => {
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    setEmailError(email && !regex.test(email) ? 'Некорректный формат e-mail' : '');
  };

  const validatePassword = (password, confirmPassword, setPasswordError) => {
    setPasswordError(password && password !== confirmPassword ? 'Пароли не совпадают' : '');
  };

  return {
    validateEmail,
    validatePassword
  }
}
