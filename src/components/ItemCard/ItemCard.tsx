import React, { JSX, useContext } from 'react';

import { Link } from 'react-router-dom';

import Vote from '@/components/Vote';
import { IMAGE_PATH, DEFAULT_IMAGE } from '@/constants/constantValues';
import { MoviesShowsContext } from '@/context';
import { calculateAverageVote } from '@/helpers';

import './ItemCard.css';
import type { IItemCard } from './types';

export default function ItemCard({ item }: IItemCard): JSX.Element {
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
