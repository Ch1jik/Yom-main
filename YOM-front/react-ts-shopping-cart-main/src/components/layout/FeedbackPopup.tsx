import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

interface FeedbackPopupProps {
    onClose: () => void;
    receiverUserId: string; // The ID of the user receiving feedback
    adId:number;
    photos:string[]
}

const FeedbackPopup: React.FC<FeedbackPopupProps> = ({ onClose, receiverUserId,adId,photos }) => {
    const [rating, setRating] = useState<number>(0);
    const [feedback, setFeedback] = useState<string>('');
    const [senderUserData, setSenderUserData] = useState<any>(null);
    const [receiverUserData, setReceiverUserData] = useState<any>(null);
    const navigate = useNavigate();

    // Assume this ID is accessible from the session or global state
    const currentUserSessionId = sessionStorage.getItem('userId'); // Replace with the real session ID
    console.log('====================================');
    console.log(currentUserSessionId);
    console.log('====================================');
    console.log('====================================');
    console.log(receiverUserId);
    console.log('====================================');
    console.log('====================================');
    console.log(adId);
    console.log('====================================');
    console.log('====================================');
    console.log(photos[0]);
    console.log('====================================');
    useEffect(() => {
        // Fetch sender user data
        axios.get(`https://localhost:7014/api/User/ById/${currentUserSessionId}`)
            .then(response => setSenderUserData(response.data))
            .catch(error => console.error('Error fetching sender user data:', error));

        // Fetch receiver user data
        axios.get(`https://localhost:7014/api/User/ById/${receiverUserId}`)
            .then(response => setReceiverUserData(response.data))
            .catch(error => console.error('Error fetching receiver user data:', error));
    }, [currentUserSessionId, receiverUserId]);

    const handleSubmitFeedback = () => {
        if (!senderUserData || !receiverUserData) return; // Don't proceed if user data hasn't loaded
    console.log('====================================');
    console.log(rating);
    console.log('====================================');
    console.log('====================================');
    console.log(senderUserData.userName);
    console.log('====================================');
    console.log('====================================');
    console.log(feedback);
    console.log('====================================');
    console.log('====================================');
    console.log(receiverUserData.id);
    console.log('====================================');
    console.log('====================================');
    console.log(adId);
    console.log('====================================');
    console.log('====================================');
    console.log(photos);
    console.log('====================================');
    const formData = new FormData();

    formData.append('Rating', rating.toString()); // Ensure it's a string
    // formData.append('username', senderUserData.userName);
    formData.append('ReviewText', feedback);
    formData.append('ReceiverId', receiverUserData.id.toString()); // Ensure it's a string
    formData.append('SenderId', senderUserData.id.toString()); // Ensure it's a string
    formData.append('AdId', adId.toString()); // Ensure it's a string
        photos.forEach((photo, index) => {

        formData.append(`Photos`, photo);
      });
    // Logging the formData contents
    for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
    }
        axios.post('https://localhost:7014/api/UserReview/Add', formData, {
            headers: {
                'accept': '*/*',
                'Content-Type': 'multipart/form-data' // This is optional, as Axios will set it for you when using FormData.
              },
        })
        .then(response => {
            console.log('Feedback submitted successfully:', response.data);
            onClose();
            navigate('/');
        })
        .catch(error => {
            console.error('Error submitting feedback:', error);
        });
    };
    const handleCloseFeedback=()=>{
        onClose();
        navigate('/myads');
    }
    return (
        <div className='feedback-popup feedback-popup-container'>
            <div className='feedback-popup feedback-popup-section'>
                <h4 className='feedback-popup feedback-popup-title'>Залиште відгук!</h4>
                <div>
                    <div>

                    </div>
                    <div className="feedback-popup feedback-popup-stars">
                        {[...Array(5)].map((star, i) => {
                            const ratingValue = i + 1;
                            return (
                                <label key={i} className='feedback-popup feedback-popup-star-label'>
                                    <input 
                                        type="radio" 
                                        name="rating" 
                                        value={ratingValue} 
                                        onClick={() => setRating(ratingValue)}
                                        className='feedback-popup feedback-popup-radio'
                                    />
                                    <span className="feedback-popup feedback-popup-star">&#9733;</span>
                                </label>
                            );
                        })}
                    </div>
                </div>
                <div>
                    <div>

                    </div>
                    <div>

                    </div>
                </div>
                <textarea 
                    rows={5} 
                    placeholder="Write your feedback here..." 
                    value={feedback} 
                    onChange={(e) => setFeedback(e.target.value)}
                    className='feedback-popup feedback-popup-textarea' 
                />
                <div className='feedback-popup-submit-btns'>

                
                    <button onClick={handleSubmitFeedback} className='feedback-popup feedback-popup-submit-btn'>Лишити відгук</button>
                    <button onClick={handleCloseFeedback} className='feedback-popup feedback-popup-close-btn'>Закрити</button>
                </div>
            </div>
        </div>
    );
    // return (
    //     <div className='feedback-popup'>
    //         <div className='feedback-popup-section'>
    //             <h4>Leave your feedback</h4>
    //             <div className="stars">
    //                 {[...Array(5)].map((star, i) => {
    //                     const ratingValue = i + 1;
    //                     return (
    //                         <label key={i}>
    //                             <input 
    //                                 type="radio" 
    //                                 name="rating" 
    //                                 value={ratingValue} 
    //                                 onClick={() => setRating(ratingValue)}
    //                             />
    //                             <span className="star">&#9733;</span>
    //                         </label>
    //                     );
    //                 })}
    //             </div>
    //             <textarea 
    //                 rows={5} 
    //                 placeholder="Write your feedback here..." 
    //                 value={feedback} 
    //                 onChange={(e) => setFeedback(e.target.value)} 
    //             />
    //             <button onClick={handleSubmitFeedback}>Submit</button>
    //         </div>
    //     </div>
    // );
}

export default FeedbackPopup;
