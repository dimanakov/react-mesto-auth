/* template - добавить карточку */

export default function Card(props) {
  function handleClick() {
    props.onCardClick(props.link);
  }

  return (
    <li className="elements__item">
      <img className="elements__image"
        onClick={handleClick}
        src={props.link}
        alt={props.name} />
      <div className="elements__group">
        <h2 className="heading elements__heading">{props.name}</h2>
        <div className="elements__like-group">
          <button className="button elements__like-button"
            type="button"
            aria-label="отметить: нравится"></button>
          <span className="elements__like-count">{props.likes}</span>
        </div>
      </div>
      <button className="button elements__remove-item"
        type="button"
        aria-label="удалить карточку"></button>
    </li>
  )
}