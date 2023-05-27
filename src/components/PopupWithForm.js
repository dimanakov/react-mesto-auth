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