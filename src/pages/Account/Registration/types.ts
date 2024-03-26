import { IUser } from '../types';

export interface IRegistrationInfo {
  code: number;
  message: string;
}

export interface IRegister extends IUser {
  confirmPassword: string;
}
