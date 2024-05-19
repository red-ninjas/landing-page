import { cache } from 'react';

export const getReviews = cache(async (): Promise<any[]> => {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?key=${process.env.GOOGLE_KEY}&place_id=${process.env.GOOGLE_PLACE_ID}`;
  const res = await fetch(url);
  const resJson = await res.json();
  
  const reviews = resJson.result.reviews.filter(review => review.rating === 5);
  return reviews as any[];
});
