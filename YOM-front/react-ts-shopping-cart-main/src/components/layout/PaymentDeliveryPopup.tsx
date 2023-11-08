import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

interface FeedbackPopupProps {
    onClose: () => void;
    receiverUserId: string; // The ID of the user receiving feedback
}

const FeedbackPopup: React.FC<FeedbackPopupProps> = ({ onClose, receiverUserId }) => {
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

        const feedbackData = {
            "rating": rating,
            "username": senderUserData.userName,
            "reviewText": feedback,
            "userReceiverId": parseInt(receiverUserData.id, 10),
            "userSenderId": parseInt(senderUserData.id, 10)
        };

        axios.post('https://localhost:7014/api/UserReview/Add', feedbackData)
            .then(response => {
                console.log('Feedback submitted successfully:', response.data);
                onClose();
                navigate('/');
            })
            .catch(error => {
                console.error('Error submitting feedback:', error);
            });
    };

    return (
        <div className='feedback-popup'>
            <div className='feedback-popup-section'>
                <h4>Leave your feedback</h4>
                <div className="stars">
                    {[...Array(5)].map((star, i) => {
                        const ratingValue = i + 1;
                        return (
                            <label key={i}>
                                <input 
                                    type="radio" 
                                    name="rating" 
                                    value={ratingValue} 
                                    onClick={() => setRating(ratingValue)}
                                />
                                <span className="star">&#9733;</span>
                            </label>
                        );
                    })}
                </div>
                <textarea 
                    rows={5} 
                    placeholder="Write your feedback here..." 
                    value={feedback} 
                    onChange={(e) => setFeedback(e.target.value)} 
                />
                <button onClick={handleSubmitFeedback}>Submit</button>
            </div>
        </div>
    );
}

export default FeedbackPopup;
