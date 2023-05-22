import logo from '../images/logo.svg';

export default function Header() {
  return (
    <header className="header page__content">
      <img
        src={logo}
        className="logo" alt="logo" />
    </header>
  )
}