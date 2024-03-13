import { postData } from '@/helpers';
import type { ILoginResponse } from '@/pages/Account/Login/types';
import type { IUser } from '@/pages/Account/types';

const login = async (user: IUser): Promise<ILoginResponse> =>
  postData<IUser, ILoginResponse>(`${process.env.REACT_APP_MOVIES_API_DIRECTUS_URL}/auth/login`, user);

export default login;
