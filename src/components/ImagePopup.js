export default function ImagePopup() {
  return (
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
  )
}