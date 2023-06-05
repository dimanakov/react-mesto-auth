import React, { useState } from 'react';
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  
// создаём стейты для названия карточки и ссылки на картинку
const [name, setName] = useState('');
const [link, setLink] = useState('');


  function handleChangeName(e) {
    setName(e.target.value);
  }

// e - event - объект на котором происходит действие, e.target - действие, value - значение поля
// handleChangeLink - прописан в атрибуте onChange инпута link, срабатывает каждый раз при изменении value
// 
  function handleChangeLink(e) {
    setLink(e.target.value);
  }

// действия при сабмите
function handleSubmit (e) {
// предотвращаем действие сабмита по учолчанию
  e.preventDefault();
// передаём данные новой карточки наверх
  onAddPlace({
    name,
    link
  });
}


  return (
    <PopupWithForm
      name='elements'
      title='Новое место'
      isOpen={isOpen}
      onClose={onClose}
      buttonText='Сохранить'
      onSubmit={handleSubmit}>
      {<fieldset className="form__field form__field_profile-info">
        <input className="form__input form__input_el_heading"
          value={name}
          onChange={handleChangeName}
          id="heading-input"
          type="text"
          name="name"
          aria-label="Название"
          placeholder="Название"
          autoComplete="off"
          minLength="2"
          maxLength="30"
          required />
        <span className="heading-input-error form__input-error"></span>
        <input className="form__input form__input_el_image"
          value={link}
          onChange={handleChangeLink}
          id="image-input"
          type="url"
          name="link"
          aria-label="Ссылка на картинку"
          placeholder="Ссылка на картинку"
          autoComplete="off"
          required />
        <span className="image-input-error form__input-error"></span>
      </fieldset>}
    </PopupWithForm>
  )
}