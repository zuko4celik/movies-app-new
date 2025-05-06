import React, { JSX, use } from 'react';

import Vote from '@/components/Vote';
import { IMAGE_PATH, DEFAULT_IMAGE, VIDEO_PATH } from '@/constants/constantValues';
import { calculateAverageVote } from '@/helpers';

import { IMovieOrShowItem } from './types';

export default function MovieOrShowContent({ itemPromise }: IMovieOrShowItem): JSX.Element {
  const item = use(itemPromise);

  // If there is video, display it, otherwise display image
  const displayVideoOrImage =
    !item.videos || item.videos.results?.length === 0 ? (
      <img
        className='item-media picture'
        src={item.posterPath ? `${IMAGE_PATH}${item.posterPath}` : DEFAULT_IMAGE}
        alt={item.title || item.name}
      />
    ) : (
      <iframe
        title='video'
        className='item-media video'
        src={`${VIDEO_PATH}${item.videos.results[0].key}`}
        allowFullScreen
      ></iframe>
    );

  // Display item details
  const itemDetails = (
    <div>
      <h1 className='item-title'>
        {item.name || item.title}
        {item.voteAverage > 0 && <Vote value={calculateAverageVote(item.voteAverage)} />}
      </h1>
      <hr />
      <p className='item-release'>
        {item.releaseDate
          ? `Release Date: ${item.releaseDate}`
          : `First Air Date: ${item.firstAirDate} \nLast Air Date: ${item.lastAirDate}`}
      </p>
      <p className='item-overview'>
        {item.overview.length > 0 ? item.overview : 'No additional information available.'}
      </p>
    </div>
  );

  return (
    <div className='item-content'>
      {displayVideoOrImage}
      <div>{itemDetails}</div>
    </div>
  );
}
