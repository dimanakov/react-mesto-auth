import React, { useState, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';


export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e){
    setDescription(e.target.value);
  }

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
  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      name='profile'
      title='Редактировать профиль'
      isOpen={isOpen}
      onClose={onClose}
      buttonText='Сохранить'
      onSubmit={handleSubmit}>
      <fieldset className="form__field form__field_profile-info">
        <input className="form__input form__input_el_name"
          value={name}
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
        <span className="name-input-error form__input-error"></span>
        <input className="form__input form__input_el_profession"
          value={description}
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
        <span className="profession-input-error form__input-error"></span>
      </fieldset>
    </PopupWithForm>
  )
}