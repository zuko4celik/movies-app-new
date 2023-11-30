import { API_BASE_URL, API_KEY, QUERY_TYPE } from '@/constants/constantValues';
import getData from '@/helpers/getData';
import { ContentType, IItems, QueryType } from '@/types/types';

const getItems = async (queryType: QueryType, contentType: ContentType, search: string): Promise<IItems> => {
  const QUERY_TYPE_INFO = {
    [QUERY_TYPE.TOP_RATED]: `${API_BASE_URL}${contentType}/top_rated?api_key=${API_KEY}&language=en-US`,
    [QUERY_TYPE.SEARCH]: `${API_BASE_URL}search/${contentType}?api_key=${API_KEY}&language=en-US&query=${search}`,
  };
  const items = await getData<IItems>(QUERY_TYPE_INFO[queryType]);

  return items;
};

export default getItems;
