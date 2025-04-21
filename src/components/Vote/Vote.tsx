import React, { JSX } from 'react';

import type { IVote } from './types';
import './Vote.css';

export default function Vote({ value }: IVote): JSX.Element {
  return (
    <p className='vote-average'>
      <i className='fas fa-star'></i>
      {value}
    </p>
  );
}
