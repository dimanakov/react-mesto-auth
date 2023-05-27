//      popup увеличенная фотография

export default function ImagePopup(props) {
  return (
    <div className={`popup popup_scale-image ${props.card ? 'popup_opened' : ''}`}>
      <div className="popup__image-container">
        <figure className="scale-image">
          <img className="scale-image__image"
            src={props.card}
            alt='#'
            />
          <figcaption className="scale-image__figcaption"></figcaption>
        </figure>
        <button type="button"
          className="button button_focus popup__close-button"
          aria-label="закрыть"
          onClick={props.onClose}
          ></button>
      </div>
    </div>
  )
}