import React, { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import registerUser from '@/apis/registerUser';
import Field from '@/components/Field';
import { DELAY, ERROR_CODES, MESSAGES, REGISTRATION_FIELDS, STATUS_CODES } from '@/constants/constantValues';
import { registrationSchema } from '@/helpers';

import { IRegister } from './types';
import '../Account.css';
import type { IAccountInfo, IUser } from '../types';

export default function Registration(): JSX.Element {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit: handleSubmitHookForm,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(registrationSchema) });
  const [registrationInfo, setRegistrationInfo] = useState<IAccountInfo>({
    code: STATUS_CODES.OK,
    message: '',
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = handleSubmitHookForm((user: IUser) => {
    registerUser(user)
      .then((response) => {
        if (response.status == STATUS_CODES.OK) {
          setRegistrationInfo({ code: STATUS_CODES.OK, message: MESSAGES.USER_CREATED });
          reset();
          setTimeout(() => {
            navigate('/login');
          }, DELAY);
        }
      })
      .catch(
        ({
          error: {
            response: {
              data: { errors },
            },
          },
        }) => {
          if (errors[0].extensions.code === ERROR_CODES.RECORD_NOT_UNIQUE) {
            setRegistrationInfo({ code: STATUS_CODES.BAD_REQUEST, message: MESSAGES.USER_ALREADY_EXISTS });
          }
        },
      );
  });

  return (
    <div className='account-container'>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <h2>Registration</h2>

          {REGISTRATION_FIELDS.map((field) => (
            <Field<IRegister>
              key={field.id}
              id={field.id}
              type={field.type}
              label={field.label}
              placeholder={field.placeholder}
              register={register}
              isRequired={field.isRequired}
              autoComplete={field.autoComplete}
              errors={errors}
              showPassword={showPassword}
              setShowPassword={() => setShowPassword(!showPassword)}
            ></Field>
          ))}

          <button type='submit' disabled={isSubmitting}>
            Create account
          </button>
        </fieldset>
      </form>

      {registrationInfo.message ? (
        <div className={registrationInfo.code === STATUS_CODES.OK ? 'text-success' : 'text-danger'}>
          {registrationInfo.message}
        </div>
      ) : null}
    </div>
  );
}
