import React from 'react';

import { IVote } from './types';
import './Vote.css';

export default function Vote({ value }: IVote) {
  return (
    <p className='vote-average'>
      <i className='fas fa-star'></i>
      {value}
    </p>
  );
}
