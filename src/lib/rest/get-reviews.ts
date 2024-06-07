import { cache } from 'react';

const staticReviews: any[] = [
  {
    author_name: "Oksana Korzh",
    rating: 5,
    text: "Our company decided to outsource our web development needs, and to be honest, we've had some bad experiences in the past. But we're glad we chose this agency. Their team was responsive, skilled, and delivered a website that exceeded our expectations.",
    time: "3 months ago",
  },
  {
    author_name: "Michael",
    rating: 5,
    text: "This agency really takes care to have projects finished in time and in budget. I like the results we could produce for our clients so far. One of the key factors making them so successful seems to be the tight relationship they form with clients.",
    time: "3 months ago",
  },
  {
    author_name: "HR Statok",
    rating: 5,
    text: "Recommend this company as trustable and high quality service provider. Always delivered on time, also patient and attentive to wish of customer :)",
    time: "3 months ago",
  },
  {
    author_name: "Taner Weiss",
    rating: 5,
    text: "I received a recommendation from friends to work with this company and I have been completely satisfied since the first meeting until today. I am becoming increasingly confident that they will handle this and other projects without any issues.",
    time: "3 months ago",
  },
  {
    author_name: "Elmo Peter",
    rating: 5,
    text: "As part of our collaboration, the company has proven to be an indispensable partner in the areas of consulting, programming and UI design. Our experiences with their services have been consistently excellent, leading us to highly recommend them.",
    time: "2 months ago",
  },
  {
    author_name: "Peter Rainer",
    rating: 5,
    text: "This company impresses with its reliable project managers and scores with always on-time deliveries. Highly Recommended!",
    time: "a month ago",
  },
];


export const getReviews = cache(async (): Promise<any[]> => {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?key=${process.env.GOOGLE_KEY}&place_id=${process.env.GOOGLE_PLACE_ID}`;
  const res = await fetch(url);
  const resJson = await res.json();

  if (resJson.result && resJson.result.reviews) {
    return resJson.result.reviews as any[];
  }
  
  return staticReviews;
});
