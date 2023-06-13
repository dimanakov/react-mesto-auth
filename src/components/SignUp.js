import React, { useContext, useEffect } from 'react';
import SignForm from './SignForm';
import useFormAndValidation from '../hooks/useFormAndValidation';
import { AppContext } from '../contexts/AppContext';


export default function SignUp({ onSubmit }) {

  const { values, handleChange, errors, isValid, setIsValid, resetForm } = useFormAndValidation({});
  const { isLoading } = useContext(AppContext);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onSubmit({
      email: values.email,
      password: values.password,
    })
  }

  useEffect(() => {
    setIsValid(false)
  }, [setIsValid])

  return (
    <SignForm
      name='register'
      onSubmit={handleSubmit}
      title='Регистрация'
      isValid={isValid}
      buttonText={`${isLoading ? 'Регистрация...' : 'Зарегистрироваться'}`}>
      <fieldset className="form__field form__field_signin">
        <input className="form__input form__input_el_email"
          value={values.email || ''}
          onChange={handleChange}
          id="emeil-input"
          type="email"
          name="email"
          aria-label="email"
          placeholder="Email"
          autoComplete="on"
          minLength="2"
          maxLength="200"
          required />
        <span className={`name-input-error form__input-error ${errors.email ? 'form__input-error_active' : ''}`}>{errors.email}</span>
        <input className="form__input form__input_el_password"
          value={values.password || ''}
          onChange={handleChange}
          id="password-input"
          type="password"
          name="password"
          aria-label="password"
          placeholder="Пароль"
          autoComplete="off"
          minLength="8"
          maxLength="30"
          required />
        <span className={`password-input-error form__input-error ${errors.password ? 'form__input-error_active' : ''}`}>{errors.password}</span>
      </fieldset>
    </SignForm>
  )
}
