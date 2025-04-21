import React, { JSX, Suspense } from 'react';

import { Link, useParams } from 'react-router-dom';

import getItem from '@/apis/getItem';
import Loading from '@/components/Loading';
import MovieOrShowContent from '@/components/MovieOrShowContent';
import type { ContentType } from '@/types';

import './MovieOrShow.css';

export default function MovieOrShow(): JSX.Element {
  const { id, content } = useParams();
  const itemPromise = getItem(content as ContentType, id as string);

  return (
    <div className='content-bcg'>
      <div className='content-container'>
        <div className='button-back-container'>
          <Link to='/'>
            <button className='button-back'>&lt; Back</button>
          </Link>
        </div>
        <Suspense fallback={<Loading />}>
          <MovieOrShowContent itemPromise={itemPromise}></MovieOrShowContent>
        </Suspense>
      </div>
    </div>
  );
}
