import { getData } from '@/helpers';
import type { ContentType, IItem } from '@/types';

const formatUrl = (contentType: ContentType, id: string): string =>
  `${process.env.REACT_APP_MOVIES_API_BASE_URL}${contentType}/${id}?api_key=${process.env.REACT_APP_MOVIES_API_KEY}&append_to_response=videos`;

const getItem = async (contentType: ContentType, id: string): Promise<IItem> =>
  getData<IItem>(formatUrl(contentType, id))
    .then((response) => response.data)
    .catch((error) => error);

export default getItem;
