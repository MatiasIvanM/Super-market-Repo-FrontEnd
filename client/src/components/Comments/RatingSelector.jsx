import React, { useState } from 'react';
import { ImStarEmpty, ImStarHalf, ImStarFull} from 'react-icons/im';


const RatingSelector = ({ onChange }) => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    onChange(newRating);
    console.log("🚀 ~ file: RatingSelector.jsx:11 ~ handleRatingChange ~ newRating:", newRating)
  };

  const maxRating = 5;
  
const getStarType = (displayValue, rating) => {
    if (displayValue <= rating) {
      return 'ImStarFull';
    } else if (displayValue - 0.5 <= rating) {
      return 'ImStarHalf';
    } else {
      return 'ImStarEmpty';
    }
  };


  return (
    <div className="rating-selector">
      {[...Array(maxRating).keys()].map((value) => {
        const displayValue = value + 1;
        const starType = getStarType(displayValue, rating);
        return (
          <span
            key={value}
            onClick={() => handleRatingChange(displayValue)}
            className="star"
          >
            {starType === 'ImStarEmpty' && <ImStarEmpty />}
            {starType === 'ImStarHalf' && <ImStarHalf />}
            {starType === 'ImStarFull' && <ImStarFull />}
          </span>
        );
      })}
    </div>
  );
};


export default RatingSelector;
