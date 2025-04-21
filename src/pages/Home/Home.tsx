import React, { JSX, useContext } from 'react';

import ItemCard from '@/components/ItemCard';
import Loading from '@/components/Loading';
import Navbar from '@/components/Navbar';
import { CONTENT_TYPE } from '@/constants/constantValues';
import { MoviesShowsContext } from '@/context';
import type { IItem } from '@/types';

import './Home.css';
import type { IMovie, IShow } from './types';

export default function Home(): JSX.Element {
  const { movies, shows, contentType, loading } = useContext(MoviesShowsContext);
  const data = contentType === CONTENT_TYPE.TV_SHOW ? (shows as IShow[]) : (movies as IMovie[]);

  // Display movies/tv shows as item cards
  const items = data.map((item) => <ItemCard key={item.id} item={item as IItem} />);

  return loading ? (
    <Loading />
  ) : (
    <>
      <Navbar />
      <section className='grid-container'>{items}</section>
    </>
  );
}
