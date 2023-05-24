export default function PopupWithForm(props) {
  return (
    <>
      <div className={`popup popup_form popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container">
          <form className={`form form_${props.name}`}
            name={`${props.name}-form`}
            noValidate>
            <h2 className="heading form__heading form__heading_type_input">{props.title}</h2>
            {props.children}
            <button type="submit"
              className="button form__submit text">{props.buttonText}</button>
          </form>
          <button type="button"
            className="button button_focus popup__close-button"
            aria-label="закрыть"
            onClick={props.onClose}></button>
        </div>
      </div>
    </>)
}
//       <div className="popup popup_form popup_avatar">
//         <div className="popup__container">
//           <form className="form form_avatar"
//             name="avatar-form"
//             aria-label="Обновить аватар"
//             noValidate>
//             <h2 className="heading form__heading form__heading_type_input">Обновить
//               аватар</h2>
//             <fieldset className="form__field form__field_profile-avatar">
//               <input className="form__input form__input_el_avatar"
//                 id="avatar-input"
//                 name="avatar"
//                 aria-label="Аватар"
//                 placeholder="Ссылка на изображение"
//                 autoComplete="off"
//                 type="url"
//                 minLength="2"
//                 maxLength="200"
//                 required />
//               <span className="avatar-input-error form__input-error"></span>
//               <button type="submit"
//                 className="button form__submit text">Сохранить</button>
//             </fieldset>
//           </form>
//           <button type="button"
//             className="button button_focus popup__close-button"
//             aria-label="закрыть"></button>
//         </div>
//       </div>
//  {/* popup remove card */}
//       <div className="popup popup_form popup_remove-card">
//         <div className="popup__container">
//           <form className="form form_remove-card"
//             name="remove-card-form"
//             aria-label="Удалить карточку"
//             noValidate>
//             <h2 className="heading form__heading form__heading_type_confirm">Вы
//               уверены?</h2>
//             <button type="submit"
//               className="button form__submit text">Да</button>
//           </form>
//           <button type="button"
//             className="button button_focus popup__close-button"
//             aria-label="закрыть"></button>
//         </div>
//       </div>
// {/* // popup profile */}
//       <div className="popup popup_form popup_profile">
//         <div className="popup__container">
//           <form className="form form_profile"
//             name="profile-form"
//             aria-label="Заполните профиль"
//             noValidate>
//             <h2 className="heading form__heading form__heading_type_input">
//               Редактировать профиль</h2>
//             <fieldset className="form__field form__field_profile-info">
//               <input className="form__input form__input_el_name"
//                 id="name-input"
//                 type="text"
//                 name="name"
//                 aria-label="Имя"
//                 placeholder="Иван Иванов"
//                 autoComplete="off"
//                 minLength="2"
//                 maxLength="40"
//                 required />
//               <span className="name-input-error form__input-error"></span>
//               <input className="form__input form__input_el_profession"
//                 id="profession-input"
//                 type="text"
//                 name="about"
//                 aria-label="Профессия"
//                 placeholder="Строитель кораблей"
//                 autoComplete="off"
//                 minLength="2"
//                 maxLength="200"
//                 required />
//               <span className="profession-input-error form__input-error"></span>
//               <button type="submit"
//                 className="button form__submit text">Сохранить</button>
//             </fieldset>
//           </form>
//           <button type="button"
//             className="button button_focus popup__close-button"
//             aria-label="закрыть"></button>
//         </div>
//       </div>
// {/* // popup - elements */}
//       <div className="popup popup_form popup_elements">
//         <div className="popup__container">
//           <form className="form form_elements"
//             name="card-form"
//             aria-label="Создание карточки"
//             noValidate>
//             <h2 className="heading form__heading form__heading_type_input">Новое
//               место</h2>
//             <fieldset className="form__field form__field_profile-info">
//               <input className="form__input form__input_el_heading"
//                 id="heading-input"
//                 type="text"
//                 name="name"
//                 aria-label="Название"
//                 placeholder="Название"
//                 autoComplete="off"
//                 minLength="2"
//                 maxLength="30"
//                 required />
//               <span className="heading-input-error form__input-error"></span>
//               <input className="form__input form__input_el_image"
//                 id="image-input"
//                 type="url"
//                 name="link"
//                 aria-label="Ссылка на картинку"
//                 placeholder="Ссылка на картинку"
//                 autoComplete="off"
//                 required />
//               <span className="image-input-error form__input-error"></span>
//               <button type="submit"
//                 className="button form__submit form__submit_inactive text">Создать</button>
//             </fieldset>
//           </form>
//           <button type="button"
//             className="button button_focus popup__close-button"
//             aria-label="закрыть"></button>
//         </div>
//       </div>
//     </>
//   )
// }