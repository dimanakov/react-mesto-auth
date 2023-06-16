import logo from '../images/logo.svg';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header page__content">
      <img
        src={logo}
        className="logo" alt="logo" />
      <div className='header__menu'>
        <NavLink to="/sign-in" className="header__link">Войти</NavLink>
        <NavLink to="/sign-up" className="header__link">Зарегистрироваться</NavLink>
        <NavLink to="/sign-in" className="header__link">Выйти</NavLink>
      </div>
    </header>
  )
}