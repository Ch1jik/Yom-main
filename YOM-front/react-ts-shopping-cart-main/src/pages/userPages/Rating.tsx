import React, { useEffect, useState } from 'react';
import CustomNavbar from '../../components/layout/CustomNavbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getToken } from '../../utilities/TokenUtility';
import { useUser } from '../../utilities/UserContext';  // <- Import the useUser hook here
import RatingProgressBar from '../../components/layout/RatingProgressBar';
import big_star from '../../assets/images/big_star.svg'
import users_logo from '../../assets/images/userratingimage.svg'
const Rating: React.FC = () => {
  const navigate = useNavigate();
  const { userId } = useUser();  // <- Use the hook here to get userId
  const [ratingData, setRatingData] = useState({
    average: 0,
    countOfFive: 0,
    countOfFour: 0,
    countOfThree: 0,
    countOfTwo: 0,
    countOfOne: 0
  });
  type Review = {
    id: number;
    rating: number;
    senderUserName: string;
    senderAvatarPath: string;
    reviewText: string;
    receiverId: string;
    senderId: string;
    photos: string[];
    dateCreate: Date;
    adId: number;
    adTitle: string;
  };
  const positiveReviewsCount = ratingData.countOfFive + ratingData.countOfFour;
const neutralReviewsCount = ratingData.countOfThree;
const negativeReviewsCount = ratingData.countOfTwo + ratingData.countOfOne;



  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const checkAuthenticationStatus = () => {
      const isAuthenticated = !!getToken();
      if (!isAuthenticated) {
        navigate('/login');
      }
    };

    const fetchUserRatings = async () => {
      try {
        // Use the userId from the context in your API call
        const response = await axios.get(`https://localhost:7014/api/UserReview/AllUserRatings?userId=${userId}`);
        setRatingData(response.data);
      } catch (error) {
        console.error("Error fetching user ratings:", error);
      }
    };

    const fetchUserReviews = async (pageNumber = 1) => {
      try {
        const response = await axios.get(`https://localhost:7014/api/UserReview/AllUserReview?userId=${userId}&pageNumber=${pageNumber}`);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching user reviews:", error);
      }
    };

    checkAuthenticationStatus();
    fetchUserRatings();
    fetchUserReviews();

  }, [navigate, userId]);  // <- Include userId in the dependency array

  return (
    <main >
      <div className='myadsPage'>
        <div className='myads-menu'> 
          <CustomNavbar />
        </div>
        <section>
          <div className='user-fulldescription-rating-size'>
          <div className='user-fulldescription-rating-section'>
            <div className='user-fulldescription-rating-average-section'>
            <div className='user-fulldescription-rating-average'>
            {ratingData.average}
            </div>
            <div className='user-fulldescription-rating-average-stars'>
            {Array.from({ length: Math.floor(ratingData.average) }).map((_, index) => (
                <img key={index} src={big_star} alt="big star"/>
            ))}
            </div>
            </div>
            <div className='user-fulldescription-rating-rows'>
            <RatingProgressBar rating={5} count={ratingData.countOfFive} maxCount={10} />
            <RatingProgressBar rating={4} count={ratingData.countOfFour} maxCount={10} />
            <RatingProgressBar rating={3} count={ratingData.countOfThree} maxCount={10} />
            <RatingProgressBar rating={2} count={ratingData.countOfTwo} maxCount={10} />
            <RatingProgressBar rating={1} count={ratingData.countOfOne} maxCount={10} />
            </div>
            
          </div>
          <div className='user-fulldescription-rating-count'>
                <div className='user-fulldescription-rating-count-size'>
                  <div className='user-fulldescription-rating-count-title'>Відгуки</div>
                  <div>{reviews.length}</div>
                </div>
                <div className='user-fulldescription-rating-count-size'>
                  <div className='user-fulldescription-rating-count-title'>Позитивні</div>
                  <div>{positiveReviewsCount}</div>
                </div>
                <div className='user-fulldescription-rating-count-size'>
                  <div className='user-fulldescription-rating-count-title'>Нейтральні</div>
                  <div>{ratingData.countOfThree}</div>
                </div>
                <div className='user-fulldescription-rating-count-size'>
                  <div className='user-fulldescription-rating-count-title'>Негативні</div>
                  <div>{negativeReviewsCount}</div>
                </div>
            </div>
          </div>
          {reviews.length === 0 ? (
                        <p>No reviews available.</p>
                      ) : (
                        <>
                          {reviews.map((review, index) => (
                           <div className='feedback-all' key={review.id}>
                           <div className='feedback-all-userphoto'>
                             <img src={users_logo}></img>
                           </div>
                           <div className='feedback-all-info-section'>
                             <div>
                               <div className='feedback-all-username'>
                                 {review.senderUserName}

                               </div>
                               <div className='feedback-all-info'>
                                 <div className='feedback-all-stars'>
                                   <p> {review.rating}/5 </p>
                                 </div>
                                 <div className='feedback-all-date'>
                                   <small>Reviewed on {new Date(review.dateCreate).toLocaleDateString()}</small>
                                 </div>
                                 <div className='feedback-all-title'>
                                   {review.adTitle}
                                 </div>
                               </div>
                               <div className='feedback-all-description'>
                                 <p>{review.reviewText}</p>
                               </div>
                             </div>
                             <div className='feedback-all-photos'>
                               {review.photos.slice(0, 5).map((photo, index) => (
                                 <div key={index} className='feedback-photo-block'>
                                   <img src={photo} alt={`Review Photo ${index + 1}`} />
                                 </div>
                               ))}
                             </div>
                           </div>
                         </div>
                        
                          ))}
                        </>
                        )}
        </section>
      </div>
    </main>
  );
};

export default Rating;
