import PopupWithForm from "./PopupWithForm";


export default function ConfirmPopup({ isOpen, onClose, onConfirm }) {


  function handleSubmit(e) {
    e.preventDefault();
    onConfirm();
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      name='remove-card'
      title='Вы уверены?'
      onClose={onClose}
      buttonText='Сохранить'
    />
  )
}