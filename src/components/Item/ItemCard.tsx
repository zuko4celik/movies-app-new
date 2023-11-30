import React, { useContext } from 'react';

import { Link } from 'react-router-dom';

import Vote from '@/components/Vote/Vote';
import { IMAGE_PATH, DEFAULT_IMAGE } from '@/constants/constantValues';
import { MoviesShowsContext } from '@/context/Context';
import calculateAverageVote from '@/helpers/calculateAverageVote';

import './ItemCard.css';
import { IItemCard } from './types';

export default function ItemCard({ item }: IItemCard) {
  const { contentType } = useContext(MoviesShowsContext);
  const { id, posterPath, title, name, voteAverage } = item;

  return (
    <Link to={`/${contentType}/${item.id}`} className='no-decoration'>
      <div key={id} className='item-container'>
        <img src={posterPath ? `${IMAGE_PATH}${posterPath}` : DEFAULT_IMAGE} alt={name || title} />
        <div className='title-container'>
          <h1 className='title'>{title || name}</h1>
          {voteAverage > 0 && <Vote value={calculateAverageVote(voteAverage)} />}
        </div>
      </div>
    </Link>
  );
}
