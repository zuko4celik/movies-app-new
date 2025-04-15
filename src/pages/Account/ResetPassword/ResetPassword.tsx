import React, { ChangeEvent, FormEvent, JSX, useEffect, useState } from 'react';

import { Link, useSearchParams } from 'react-router-dom';

import resetPassword from '@/apis/resetPassword';
import { MESSAGES, STATUS_CODES } from '@/constants/constantValues';
import { passwordValidationPattern } from '@/helpers/validators';

import type { IAccountInfo } from '../types';

export default function ResetPassword(): JSX.Element {
  const [password, setPassword] = useState<string>('');
  const [passwordValidationMessage, setPasswordValidationMessage] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [resetPasswordInfo, setResetPasswordInfo] = useState<IAccountInfo>({
    code: STATUS_CODES.OK,
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const tokenValue = searchParams.get('token') || '';

    if (tokenValue) {
      setToken(tokenValue);
      setSearchParams({});
    }
  }, []);

  const handlePassword = (event: ChangeEvent<HTMLInputElement>): void => {
    setPasswordValidationMessage('');
    setPassword(event.target.value);
  };

  const validatePassword = (password: string): boolean => {
    if (!password) {
      setPasswordValidationMessage(MESSAGES.PASSWORD_REQUIRED);

      return false;
    }

    if (!passwordValidationPattern.test(password)) {
      setPasswordValidationMessage(MESSAGES.PASSWORD_INVALID_FORMAT);

      return false;
    }

    return true;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (isSubmitting || !validatePassword(password)) return;

    setIsSubmitting(true);
    resetPassword(password, token)
      .then(() =>
        setResetPasswordInfo({
          code: STATUS_CODES.OK,
          message: MESSAGES.RESET_PASSWORD_MESSAGE,
        }),
      )
      .catch(() =>
        setResetPasswordInfo({
          code: STATUS_CODES.BAD_REQUEST,
          message: MESSAGES.GENERAL_ERROR_MESSAGE,
        }),
      )
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className='account-container'>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <h2>Reset Password</h2>
          <div className='field password-wrapper'>
            <label htmlFor='password'>
              Password <sup>*</sup>
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id='password'
              value={password}
              onChange={handlePassword}
              placeholder='Enter you new password'
              className={passwordValidationMessage ? 'border-danger' : ''}
            ></input>
            <i
              className={showPassword ? 'fa fa-solid fa-eye' : 'fa fa-solid fa-eye-slash'}
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            ></i>
            {passwordValidationMessage ? <p className='text-danger'>{passwordValidationMessage}</p> : null}
          </div>
          <button type='submit' disabled={isSubmitting}>
            Reset password
          </button>
        </fieldset>
      </form>
      <div>
        <Link to='/login'>Back to login.</Link>
      </div>
      {resetPasswordInfo.message ? (
        <div className={resetPasswordInfo.code === STATUS_CODES.OK ? 'text-success' : 'text-danger'}>
          {resetPasswordInfo.message}
        </div>
      ) : null}
    </div>
  );
}
