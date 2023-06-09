import React from 'react';
import useValidation from "../../hooks/useValidation";
import LogoLink from "../Header/LogoLink/HeaderLogo";
import { Link } from "react-router-dom";
import { EMAIL_PATTERN, NAME_PATTERN } from "../../constants/constPattern";

const Register = ({ summaryErrors, onRegister, isLoading, isLoggedIn }) => {
  const {
    inputValues,
    inputErrors,
    inputValid,
    handleChange
  } = useValidation();

  const inputFields = [
    {
      name: "name",
      id: "name",
      label: "Имя",
      placeholder: "Имя",
      type: "text",
      pattern: NAME_PATTERN,
      required: true
    },
    {
      name: "email",
      id: "email",
      label: "E-mail",
      placeholder: "E-mail",
      type: "email",
      pattern: EMAIL_PATTERN,
      onBlur: true,

      required: true
    },
    {
      name: "password",
      id: "password",
      label: "Пароль",
      placeholder: "Пароль",
      type: "password",
      minLength: 3,
      required: true
    }
  ];

  function handleSubmit(e) {
    onRegister(inputValues.email, inputValues.password, inputValues.name);
    e.preventDefault();
  }

  function handleSelect(evt) {
    evt.target.select();
  }

  const formSettingsLocal = {
    fieldsetClassName: "register__fieldset",
    labelClassName: "register__label",
    textErrorClassName: "register__input-text-error",
    inputErrorClassName: "register__input_error",
    summaryErrorClassName: "register__errors-summary",
    formClassName: "register__form",
    inputClassName: "register__input",
    buttonClassName: "register__button",
    buttonDisableClassName: "register__button_disable"
  };

  const formInputs = inputFields.map((input, index) => (
    <fieldset key={index} className={formSettingsLocal.fieldsetClassName}>
      <label className={formSettingsLocal.labelClassName}>{input.label}</label>
      <input
        name={input.name}
        id={input.name}
        className={`${formSettingsLocal.inputClassName} ${inputErrors[ input.name ] ? formSettingsLocal.inputErrorClassName : ''}`}
        placeholder={input.label}
        minLength={input.minLength}
        maxLength={input.maxLength}
        type={input.type}
        pattern={input.pattern}
        value={inputValues[ input.name ] || ''}
        onChange={handleChange}
        onClick={handleSelect}
        required
      />
      <span className={formSettingsLocal.textErrorClassName}>
        {inputErrors[ input.name ]}
      </span>
    </fieldset>
  ));


  return (
    <main className="register">
      <header className="register__header">
        <LogoLink/>
        <h1 className="register__title">Добро пожаловать!</h1>
      </header>
      <form className={formSettingsLocal.formClassName} onSubmit={handleSubmit} action="#">
        {formInputs}
        <span className={formSettingsLocal.summaryErrorClassName}>{summaryErrors}</span>
        <button
          disabled={isLoading || !inputValid}
          type="submit"
          className={`${!isLoggedIn && (!isLoading && inputValid) ? '' : formSettingsLocal.buttonDisableClassName} ${formSettingsLocal.buttonClassName}`}>
          Зарегистрироваться
        </button>
      </form>
      <div className="register__question-text">Уже зарегистрированы?
        <Link to="/signin" className="register__question-link">Войти</Link>
      </div>
    </main>
  );
};

export default Register;
