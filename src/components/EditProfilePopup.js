import React, { useState, useEffect, useContext, useRef } from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';


export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  const nameRef = useRef();
  const descriptionRef = useRef();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // валидация формы
  const [isValid, checkValidity] = useState(true);

  const [isNameValid, setNameValidity] = useState(true);
  const [isDescriptionValid, setDescriptionValidity] = useState(true);
  const inputListValidity = [isNameValid, isDescriptionValid];

  const [isNameErrorActive, setNameErrorActivity] = useState(false);
  const [isDescriptionErrorActive, setDescriptionErrorActivity] = useState(false);

  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [descriptionErrorMessage, setDescriptionErrorMessage] = useState('');


  function handleChangeName(e) {
    setName(e.target.value);
    setNameValidity(nameRef.current.validity.valid)
    setNameErrorMessage(e.target.validationMessage);
    (isNameValid ? setNameErrorActivity(false) : setNameErrorActivity(true));
    checkInputsValidity();
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
    setDescriptionValidity(descriptionRef.current.validity.valid);
  setDescriptionErrorMessage(e.target.validationMessage);
  // console.log(isDescriptionValid);
  (isDescriptionValid ? setDescriptionErrorActivity(false) : setDescriptionErrorActivity(true));
  checkInputsValidity();
  }

  // useEffect(() => {
  //   setNameValidity();
  //   setNameErrorMessage();
  // }, [])


  function checkInputsValidity() {

    checkValidity(inputListValidity.some((element) => {
      return !element !== true
    })
    )
  };
  // console.log(checkInputsValidity);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  useEffect(() => {
    setNameErrorMessage('');
    setDescriptionErrorMessage('');
  }, [isOpen]);

  return (
    <PopupWithForm
      name='profile'
      title='Редактировать профиль'
      isOpen={isOpen}
      onClose={onClose}
      buttonText='Сохранить'
      isValid={isValid}
      onSubmit={handleSubmit}>
      <fieldset className="form__field form__field_profile-info">
        <input className="form__input form__input_el_name"
          ref={nameRef}
          value={name || ''}
          onChange={handleChangeName}
          id="name-input"
          type="text"
          name="name"
          aria-label="Имя"
          placeholder="Иван Иванов"
          autoComplete="off"
          minLength="2"
          maxLength="40"
          required />
        <span className={`name-input-error form__input-error ${isNameErrorActive ? 'form__input-error_active' : ''}`}>{nameErrorMessage}</span>
        <input className="form__input form__input_el_profession"
          ref={descriptionRef}
          value={description || ''}
          onChange={handleChangeDescription}
          id="profession-input"
          type="text"
          name="about"
          aria-label="Профессия"
          placeholder="Строитель кораблей"
          autoComplete="off"
          minLength="2"
          maxLength="200"
          required />
        <span className={`profession-input-error form__input-error ${isDescriptionErrorActive ? 'form__input-error_active' : ''}`}>{descriptionErrorMessage}</span>
      </fieldset>
    </PopupWithForm>
  )
}