import React, { useState, useEffect } from 'react';
import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import api from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { AppContext } from '../contexts/AppContext'
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import ImagePopup from './ImagePopup';

// валидация форм
// import FormValidator from './FormValidator';
// import { configValidatorForm, configProfile, configPopup } from '../utils/classNameConfig.js';


export default function App() {


  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [selectedCard, handleCardClick] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCardsData] = useState([]);
  const [element, setElement] = useState({}); // стейт для карточки на удаление


  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }

  // изначально планировал сделать универсальный popup Confirm,
  // но не решил проблему с передачей функции удаления через атрибут.
  // Пришлось сделать попап только под удаление карточки
  function handleRemovePlaceConfirm() {
    handleCardDelete(element);
  }

  // Используется в <Card onRemoveCard={handleRemovePlaceClick}>
  function handleRemovePlaceClick(card) {
    setConfirmPopupOpen(true);
    setElement(card);
  }

  function closeAllPopups() {   //универсальная функция закрытия попапов через крестик
    setAddPlacePopupOpen(false);
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setConfirmPopupOpen(false);
    handleCardClick({});
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api.setUserInfo(data)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {             //попадаем сюда если промис завершится ошибкой 
        console.error(err);
      })
      .finally(() => { setIsLoading(false) });
  }

  function handleUpdateAvatar(link) {
    setIsLoading(true);
    api.setUserAvatar(link)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {             //попадаем сюда если промис завершится ошибкой 
        console.error(err);
      })
      .finally(() => { setIsLoading(false) });
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api.addCard(data)
      .then((card) => {
        setCardsData([card, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {             //попадаем сюда если промис завершится ошибкой 
        console.error(err);
      })
      .finally(() => { setIsLoading(false) });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card, !isLiked)
      .then((newCard) => {
        setCardsData((cards) => cards.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {             //попадаем сюда если промис завершится ошибкой 
        console.error(err);
      });
  }

  function handleCardDelete(card) {
    setIsLoading(true);
    api.removeCard(card)
      .then(() => {
        setCardsData((cards) =>
          cards.filter((item) => { return item._id !== card._id })
        )
        closeAllPopups();
      })
      .catch((err) => {             //попадаем сюда если промис завершится ошибкой 
        console.error(err);
      })
      .finally(() => { setIsLoading(false) });
  }

  useEffect(() => {   //запрос данных отправляется 2 раза из-за srtict-mode
    function getUserData() {
      Promise.all([
        api.getUserInfo(),
        api.getInitialCards()
      ])
        .then(([userData, initialCards]) => {
          setCurrentUser(userData);
          setCardsData(initialCards);
        })
        .catch((err) => {             //попадаем сюда если один из промисов завершится ошибкой 
          console.error(err);
        });
    }
    getUserData();
  }, []) // пустая зависимость для однократного вызова эффекта

  return (    //визуальное содержимое компонента App вставляемое на главную страницу index
    <AppContext.Provider value={{ isLoading, closeAllPopups }}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header />
          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onRemoveCard={handleRemovePlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            cards={cards}>
          </Main>
          <Footer />
          <EditAvatarPopup
            onUpdateAvatar={handleUpdateAvatar}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups} />
          <EditProfilePopup
            onUpdateUser={handleUpdateUser}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups} />
          <AddPlacePopup
            onAddPlace={handleAddPlaceSubmit}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups} />
          <ConfirmPopup
            isOpen={isConfirmPopupOpen}
            onClose={closeAllPopups}
            onConfirm={handleRemovePlaceConfirm} />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />
        </div >
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  )
}