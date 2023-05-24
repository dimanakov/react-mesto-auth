export default function Main({onEditProfile, onAddPlace, onEditAvatar}) {

  return (
    <main>
      <section className="profile page__content page__content_narrow"
        aria-label="профиль пользователя">
        <div className="profile__cover">
          <img className="profile__avatar"
            src="<%=require('./images/kusto.jpg')%>"
            alt="фотография пользователя" />
          <button className="button profile__avatar-button"
            type="button"
            aria-label="редактировать аватар"
            onClick={onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <div className="profile__group">
            <h1 className="heading profile__name">Жак-Ив Кусто</h1>
            <button className="button button_focus profile__edit-button"
              type="button"
              aria-label="редактировать профиль"
              onClick={onEditProfile}></button>
          </div>
          <p className="text profile__profession">Исследователь океана</p>
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
        </ul>
      </section>
    </main>
  )
}