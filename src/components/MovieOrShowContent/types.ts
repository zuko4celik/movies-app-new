import { IItem } from '@/types';

export interface IMovieOrShowItem {
  itemPromise: Promise<IItem>;
}
