import type { AxiosResponse } from 'axios';

import axiosInstance from '@/axiosInstance';

const getData = async <T>(url: string, signal?: AbortSignal): Promise<AxiosResponse<T>> =>
  axiosInstance.get<T>(url, { signal });

export default getData;
