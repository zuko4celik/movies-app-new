import React from 'react';

import { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface IField<T extends FieldValues> {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  register: UseFormRegister<T>;
  isRequired: boolean;
  autoComplete: string;
  errors: FieldErrors;
  showPassword?: boolean;
  setShowPassword?: () => void;
}

const Field = <T extends FieldValues>({
  id,
  type,
  label,
  placeholder,
  register,
  isRequired,
  autoComplete,
  errors,
  showPassword,
  setShowPassword,
}: IField<T>): JSX.Element => {
  const fieldClassName = id === 'password' ? 'field password-wrapper' : 'field';
  const inputType = id === 'password' ? (showPassword ? 'text' : 'password') : type;
  const error = errors[id];
  const errorMessage = error?.message?.toString();
  const iconClassName = showPassword ? 'fa fa-solid fa-eye' : 'fa fa-solid fa-eye-slash';
  const iconAriaLabel = showPassword ? 'Hide password' : 'Show password';

  return (
    <div className={fieldClassName}>
      <label htmlFor={id}>
        {label} {isRequired && <sup>*</sup>}
      </label>
      <input
        id={id}
        type={inputType}
        {...register(id as Path<T>)}
        className={error ? 'border-danger' : ''}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
      {id === 'password' && <i className={iconClassName} onClick={setShowPassword} aria-label={iconAriaLabel}></i>}
      <p className='text-danger'>{errorMessage}</p>
    </div>
  );
};

export default Field;
