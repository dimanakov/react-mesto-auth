//      popup увеличенная фотография

export default function ImagePopup({card, onClose}) {
  return (
    <div className={`popup popup_scale-image ${card.link ? 'popup_opened' : ''}`}>
      <div className="popup__image-container">
        <figure className="scale-image">
          <img className="scale-image__image"
            src={card.link}
            alt='#'
            />
          <figcaption className="scale-image__figcaption"></figcaption>
        </figure>
        <button type="button"
          className="button button_focus popup__close-button"
          aria-label="закрыть"
          onClick={onClose}
          ></button>
      </div>
    </div>
  )
}