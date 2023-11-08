import React from 'react';
import '../../assets/css/RatingProgressBar.css';
import star from '../../assets/images/small_star.svg'

interface Props {
  rating: number;
  count: number;
  maxCount: number;
}

const RatingProgressBar: React.FC<Props> = ({ rating, count, maxCount }) => {
  const widthPercentage = (count / maxCount) * 100;

  return (
    <div className="rating-container">
      <span className="rating-star">{rating}<img src={star}></img ></span>
      <div className="rating-bar-bg">
        <div
          className="rating-bar-fill"
          style={{ width: `${widthPercentage}%` }}
        ></div>
      </div>
      <span className="rating-count">{count}</span>
      
    </div>
  );
};

export default RatingProgressBar;
