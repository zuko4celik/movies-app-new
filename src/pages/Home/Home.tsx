import React, { useContext } from 'react';

import ItemCard from '@/components/Item/ItemCard';
import Loading from '@/components/Loading/Loading';
import Navbar from '@/components/Navbar/Navbar';
import { CONTENT_TYPE } from '@/constants/constantValues';
import { MoviesShowsContext } from '@/context/Context';
import { IShow, IMovie, IItem } from '@/types/types';

import './Home.css';

export default function Home() {
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
