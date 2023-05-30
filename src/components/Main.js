export default function Main({ userAvatar, userName, userDescription, onEditAvatar, onEditProfile, onAddPlace, children}) {

  return (
    <main>
      <section className="profile page__content page__content_narrow"
        aria-label="профиль пользователя">
        <div className="profile__cover">
          <img className="profile__avatar"
            src={`${userAvatar}`}
            alt="фотография пользователя" />
          <button className="button profile__avatar-button"
            type="button"
            aria-label="редактировать аватар"
            onClick={onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <div className="profile__group">
            <h1 className="heading profile__name">{userName}</h1>
            <button className="button button_focus profile__edit-button"
              type="button"
              aria-label="редактировать профиль"
              onClick={onEditProfile}></button>
          </div>
          <p className="text profile__profession">{userDescription}</p>
        </div>
        <button className="button button_focus profile__add-button"
          type="button"
          aria-label="добавить место в галерею"
          onClick={onAddPlace}></button>
      </section>
      <section className="elements page__content page__content_narrow"
        aria-label="галерея посещённых мест]">
        <ul className="elements__gallery">
          {/* место для карточек */}
          {children}
        </ul>
      </section>
    </main>
  )
}