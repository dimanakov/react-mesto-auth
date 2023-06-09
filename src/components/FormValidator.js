export default function FormValidator({ configForm, validatePopup }) {

  
  const validateForm = document.forms[validatePopup];
  const inputList = Array.from(validateForm.querySelectorAll(configForm.formInput));
  const submitButton = validateForm.querySelector(configForm.formSubmit);

const [name, setName] = useState('');

  function _hasInvalidInput() {
    // проходим по этому массиву методом some
    return inputList.some((element) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция прервётся
      return !element.validity.valid;
    })
  };

  function _showInputError(inputElement, errorMessage) {
    this._formError = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.formInputTypeError);
    this._formError.textContent = errorMessage;
    this._formError.classList.add(this._config.formInputErrorActive);
  };

  function _hideInputError(inputElement) {
    this._formError = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.formInputTypeError);
    this._formError.classList.remove(this._config.formInputErrorActive);
    this._formError.textContent = '';
  };

// показывает или прячет сообщение об ошибке
  function _isValid(inputElement) { 
    if (!inputElement.validity.valid) {
      _showInputError(inputElement, inputElement.validationMessage);
    } else {
      _hideInputError(inputElement);
    }
  };
function handleName(e){
  setName(e.target.value);
  _toggleButtonState();
}

  <input 
  
  value={name}
  onChange={handleName} />


  constructor(configItems, formElement) {
    this._config = configItems;
    this._form = document.forms[formElement];
    this._inputList = Array.from(this._form.querySelectorAll(this._config.formInput));
    this._buttonElement = this._form.querySelector(this._config.formSubmit);
  }

  _showInputError(inputElement, errorMessage) {
    this._formError = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.formInputTypeError);
    this._formError.textContent = errorMessage;
    this._formError.classList.add(this._config.formInputErrorActive);
  };

  _hideInputError(inputElement) {
    this._formError = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.formInputTypeError);
    this._formError.classList.remove(this._config.formInputErrorActive);
    this._formError.textContent = '';
  };

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput() {
    // проходим по этому массиву методом some
    return this._inputList.some((element) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция прервётся
      return !element.validity.valid;
    })
  };

  submitButtonActivate() {
    this._buttonElement.classList.remove(this._config.formSubmitInactive);
    this._buttonElement.disabled = false;
  };

  submitButtonInactivate() {
    this._buttonElement.classList.add(this._config.formSubmitInactive);
    this._buttonElement.disabled = true;
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.submitButtonInactivate();
    } else {
      this.submitButtonActivate();
    }
  };

  removeError() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    })
  }

  enableValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      })
    })
  };
}