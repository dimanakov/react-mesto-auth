import React from 'react';
import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import { api } from '../utils/Api.js';
import Card from './Card.js';

export default function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, handleCardClick] = React.useState('')

  const [userInfo, setUserInfo] = React.useState([]);
  const [cards, setCardsData] = React.useState([]);

  React.useEffect(() => {
    function getUserData() {
      Promise.all([
        api.getUserInfo(),
        api.getInitialCards()
      ])
        .then(([userData, initialCards]) => {
          setUserInfo(userData);
          setCardsData(initialCards);
        })
        .catch((err) => {             //попадаем сюда если один из промисов завершится ошибкой 
          console.error(err);
        });
    }
    getUserData();
  }, [])

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }

  function closeAllPopups() {
    setAddPlacePopupOpen(false);
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    handleCardClick('');
  }

  return (
    <div className="page">

      <Header />

      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        userName={userInfo.name}
        userDescription={userInfo.about}
        userAvatar={userInfo.avatar}
        children={
          cards.map((card) => {
            return (
              <Card
                key={card._id}
                name={card.name}
                link={card.link}
                likes={card.likes.length}
                onCardClick={handleCardClick}
              />
            )
          })
        }
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
        onClose={closeAllPopups}
        buttonText='Сохранить'
      />

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
    </div>
  )
}