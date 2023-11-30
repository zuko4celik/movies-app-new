import { API_BASE_URL, API_KEY } from '@/constants/constantValues';
import getData from '@/helpers/getData';
import { ContentType, IItem } from '@/types/types';

const getItem = async (contentType: ContentType, id: string): Promise<IItem> => {
  const ITEM_URL = `${API_BASE_URL}${contentType}/${id}?api_key=${API_KEY}&append_to_response=videos`;
  const item = await getData<IItem>(ITEM_URL);

  return item;
};

export default getItem;
