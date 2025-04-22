import { QUERY_TYPE } from '@/constants/constantValues';
import { getData } from '@/helpers';
import type { IItemsResponse } from '@/pages/Home/types';
import type { ContentType, QueryType } from '@/types';

const formatUrl = (queryType: QueryType, contentType: ContentType, search: string): string => {
  const QUERY_TYPE_INFO = {
    [QUERY_TYPE.TOP_RATED]: `${process.env.REACT_APP_MOVIES_API_BASE_URL}${contentType}/top_rated?api_key=${process.env.REACT_APP_MOVIES_API_KEY}&language=en-US`,
    [QUERY_TYPE.SEARCH]: `${process.env.REACT_APP_MOVIES_API_BASE_URL}search/${contentType}?api_key=${process.env.REACT_APP_MOVIES_API_KEY}&language=en-US&query=${search}`,
  };

  return QUERY_TYPE_INFO[queryType];
};

const getItems = async (queryType: QueryType, contentType: ContentType, search: string): Promise<IItemsResponse> =>
  getData<IItemsResponse>(formatUrl(queryType, contentType, search))
    .then((response) => response.data)
    .catch((error) => error);

export default getItems;
