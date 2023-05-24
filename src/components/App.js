import React from 'react';
import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isRemoveCardPopupOpen, setRemoveCardPopupOpen] = React.useState(false);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }

  function handleRemovePlaceClick() {
    setRemoveCardPopupOpen(true)
  }


  function closeAllPopups() {
    setAddPlacePopupOpen(false)
    setEditProfilePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setRemoveCardPopupOpen(false)
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onRemovePlace={handleRemovePlaceClick}
      />
      <Footer />
      <PopupWithForm
        name='avatar'
        title='Обновить аватар'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        buttonText='Сохранить'
        children={
          <fieldset className="form__field form__field_profile-avatar">
            <input className="form__input form__input_el_avatar"
              id="avatar-input"
              name="avatar"
              aria-label="Аватар"
              placeholder="Ссылка на изображение"
              autoComplete="off"
              type="url"
              minLength="2"
              maxLength="200"
              required />
            <span className="avatar-input-error form__input-error"></span>
          </fieldset>
        }
      />
      <PopupWithForm
        name='profile'
        title='Редактировать профиль'
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        buttonText='Сохранить'
        children={
          <fieldset className="form__field form__field_profile-info">
            <input className="form__input form__input_el_name"
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
        }
      />
      <PopupWithForm
        name='elements'
        title='Новое место'
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        buttonText='Сохранить'
        children={
          <fieldset className="form__field form__field_profile-info">
            <input className="form__input form__input_el_heading"
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
              id="image-input"
              type="url"
              name="link"
              aria-label="Ссылка на картинку"
              placeholder="Ссылка на картинку"
              autoComplete="off"
              required />
            <span className="image-input-error form__input-error"></span>
          </fieldset>
        }
      />

      <PopupWithForm
        name='remove-card'
        title='Вы уверены?'
        isOpen={isRemoveCardPopupOpen}
        onClose={closeAllPopups}
        buttonText='Сохранить'
      />

      <ImagePopup
        onClose={closeAllPopups}
      />


      {/* 
      popup увеличенная фотография --
       <div className="popup popup_scale-image">
        <div className="popup__image-container">
          <figure className="scale-image">
            <img className="scale-image__image"
              src="#"
              alt="#" />
            <figcaption className="scale-image__figcaption"></figcaption>
          </figure>
          <button type="button"
            className="button button_focus popup__close-button"
            aria-label="закрыть"></button>
        </div>
      </div> 

       template - добавить карточку

      <template className="card-template">
        <li className="elements__item">
          <img className="elements__image"
            src='#'
            alt="#" />
          <div className="elements__group">
            <h2 className="heading elements__heading"></h2>
            <div className="elements__like-group">
              <button className="button elements__like-button"
                type="button"
                aria-label="отметить: нравится"></button>
              <span className="elements__like-count">0</span>
            </div>
          </div>
          <button className="button elements__remove-item"
            type="button"
            aria-label="удалить карточку"></button>
        </li>
      </template> */}
    </div>
  )
}

export default App;
