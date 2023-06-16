import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { usePopupClose } from '../hooks/usePopupClose';
import success from '../images/success.svg';
import fail from '../images/fail.svg';

export default function InfoTooltip({ isOpen, isLoggedIn }) {
  const title = {success: 'Вы успешно зарегистрировались!', fail: 'Что-то пошло не так! \n Попробуйте ещё раз.'};
  const { closeAllPopups } = useContext(AppContext);
  usePopupClose(isOpen, closeAllPopups);

  return (
    <div className={`popup popup_form popup_auth ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
      <div className="auth">
          <img src={isLoggedIn ? success : fail} className="auth__logo" alt='logo' />
          <h2 className="auth__heading">{isLoggedIn ? title.success : title.fail}</h2>
      </div>
        <button type="button"
          className="button button_focus popup__close-button"
          aria-label="закрыть"
          onClick={closeAllPopups} />
      </div>
    </div>
  )
}