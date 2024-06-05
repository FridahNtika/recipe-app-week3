import React from 'react';
import '../styles/recipes.css';

const StarRating = ({ rating, outOf = 5 }) => {
  const fullStars = Math.floor(rating);
  const fractionalPart = rating - fullStars;
  const emptyStars = outOf - Math.ceil(rating);
  const fractionClass = fractionalPart >= 0.75 ? 'three-quarter' : 
                        fractionalPart >= 0.5 ? 'half' : 
                        fractionalPart >= 0.25 ? 'quarter' : '';

  return (
    <div className="star-rating">
      {[...Array(fullStars)].map((_, index) => (
        <div key={index} className="star full"></div>
      ))}
      {fractionalPart > 0 && <div className={`star ${fractionClass}`}></div>}
      {[...Array(emptyStars)].map((_, index) => (
        <div key={index} className="star empty"></div>
      ))}
    </div>
  );
};

export default StarRating;
