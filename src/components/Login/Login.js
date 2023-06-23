import React from 'react';
import useValidation from "../../hooks/useValidation";
import LogoLink from "../Header/LogoLink/HeaderLogo";
import { Link } from "react-router-dom";

const Login = ({ summaryErrors }) => {
  const {
    inputValues,
    inputErrors,
    inputValid,
    handleChange
  } = useValidation();

  const inputFields = [
    {
      name: "email",
      id: "email",
      label: "E-mail",
      placeholder: "E-mail",
      type: "email",
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

  const formSettingsLocal = {
    fieldsetClassName: "login__fieldset",
    labelClassName: "login__label",
    textErrorClassName: "login__input-text-error",
    inputErrorClassName: "login__input_error",
    summaryErrorClassName: "login__errors-summary",
    formClassName: "login__form",
    inputClassName: "login__input",
    buttonClassName: "login__button",
    buttonDisableClassName: "login__button_disable"
  };

  function handleSubmit(e) {
    e.preventDefault();
  }

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
        required
      />
      <span className={formSettingsLocal.textErrorClassName}>
        {inputErrors[ input.name ]}
      </span>
    </fieldset>
  ));

  return (
    <main className="login">
      <header className="login__header">
        <LogoLink/>
        <h1 className="login__title">Рады видеть!</h1>
      </header>
      <form className={formSettingsLocal.formClassName} onSubmit={handleSubmit} action="#">
        {formInputs}
        <span className={formSettingsLocal.summaryErrorClassName}>{summaryErrors}</span>
        <button disabled={!inputValid} type="submit" className={`${!inputValid && formSettingsLocal.buttonDisableClassName} ${formSettingsLocal.buttonClassName}`}>Войти</button>
      </form>
      <div className="login__question-text">Ещё не зарегистрированы?
        <Link to="/signup" className="login__question-link">Регистрация</Link>
      </div>
    </main>
  );
};

export default Login;
