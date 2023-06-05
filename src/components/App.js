import React from 'react';
import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/Api.js';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';



export default function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, handleCardClick] = React.useState({});

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCardsData] = React.useState([]);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }

  function closeAllPopups() {   //универсальная функция закрытия попапов через крестик
    setAddPlacePopupOpen(false);
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    handleCardClick({});
  }

  function handleUpdateUser(data) {
    api.setUserInfo(data).then((userInfo) => {
      setCurrentUser(userInfo);
      closeAllPopups();
    })
  }

  function handleUpdateAvatar(link) {
    api.setUserAvatar(link).then((userInfo) => {
      setCurrentUser(userInfo);
      closeAllPopups();
    })
  }

  function handleAddPlaceSubmit(data) {
    api.addCard(data)
      .then((card) => {
        setCardsData([card, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {             //попадаем сюда если промис завершится ошибкой 
        console.error(err);
      });
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
    api.removeCard(card)
      .then(() => {
        setCardsData((cards) =>
          cards.filter((item) => { return item._id !== card._id })
        )
      })
      .catch((err) => {             //попадаем сюда если промис завершится ошибкой 
        console.error(err);
      });
  }

  React.useEffect(() => {   //запрос данных отправляется 2 раза из-за srtict-mode
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
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />

        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}>
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />)
          })}
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
      </div >
    </CurrentUserContext.Provider>
  )
}