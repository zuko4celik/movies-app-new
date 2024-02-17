export interface IUser {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface IRegistrationResponse {
  code: number;
  message: string;
}
