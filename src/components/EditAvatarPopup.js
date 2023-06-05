import React, { useRef } from 'react';
import PopupWithForm from "./PopupWithForm";


export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {


  const avatarRef = useRef();


  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value /* Значение инпута, полученное с помощью рефа */,
    });
    avatarRef.current.value = '';
  }

  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      isOpen={isOpen}
      onClose={onClose}
      buttonText='Сохранить'
      onSubmit={handleSubmit}>
      {<fieldset className="form__field form__field_profile-avatar">
        <input className="form__input form__input_el_avatar"
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
        <span className="avatar-input-error form__input-error"></span>
      </fieldset>}
    </PopupWithForm>
  )
}