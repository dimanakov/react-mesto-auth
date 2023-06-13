export default function SignForm({ name, title, children, buttonText, isValid, onSubmit }) {

  return (
    <section className='sign'>
      <form className={`form form_${name}`}
        name={`${name}-form`}
        onSubmit={onSubmit}>
        <h2 className="heading form__heading form__heading_type_input">{title}</h2>
        {children}
        <button type="submit"
          className={`button form__submit text ${isValid ? '' : 'form__submit_inactive'}`}
          disabled={!isValid}
        >{buttonText}</button>
      </form>
    </section>
  )
}