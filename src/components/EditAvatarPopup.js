import React, { useRef, useState, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";


export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const avatarRef = useRef();
  const [isValid, checkValidity] = useState(false);
  const [isErrorActive, setErrorActivity] = useState(false);
  const [message, setMessage] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value /* Значение инпута, полученное с помощью рефа */
    });
    avatarRef.current.value = '';
  }

  function handleValue() {
    checkValidity(avatarRef.current.validity.valid);
    setMessage(avatarRef.current.validationMessage);
    (isValid ? setErrorActivity(false) : setErrorActivity(true))
  };

  useEffect(() => {
      setMessage('');
  }, [isOpen])


  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      isOpen={isOpen}
      onClose={onClose}
      buttonText='Сохранить'
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      {<fieldset className="form__field form__field_profile-avatar">
        <input className="form__input form__input_el_avatar"
          onChange={handleValue}
          ref={avatarRef}
          id="avatar-input"
          name="avatar"
          aria-label="Аватар"
          placeholder="Ссылка на изображение"
          autoComplete="on"
          type="url"
          minLength="2"
          maxLength="200"
          required />
        <span className={`avatar-input-error form__input-error ${isErrorActive ? 'form__input-error_active' : ''}`}>{message}</span>
      </fieldset>}
    </PopupWithForm>
  )
}