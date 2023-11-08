import React, { useEffect, useState } from "react";
import './styles/recipientBar.css'
import axios from 'axios'
import more from "../../assets/images/more-points.svg"

const ConversationActions: React.FC<DropdownMenuItemProps> = ({
    conversationGuid,
    isMuted,
    isPinned,
    isBlocked }) => {

    const [userId, setUserId] = useState<string>("2a68b90d-fd82-4cab-b15c-2d8fcc2bd05c");

    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(!isOpen);
    };


    const baseUrl = 'https://localhost:7014/api';
    const pinMessage = () => {
        const body = {
            isPinned: !isPinned,
            conversationGuid: conversationGuid,
            userId: userId
        }
        axios.post(baseUrl + `/Conversations/Pin`, body)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const offNotification = () => {
        const body = {
            isMuted: !isMuted,
            conversationGuid: conversationGuid,
            userId: userId
        }
        axios.post(baseUrl + `/Conversations/Mute`, body)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const blockConversation = () => {
        const body = {
            isMuted: !isBlocked,
            conversationGuid: conversationGuid,
            userId: userId
        }
        axios.post(baseUrl + `/Conversations/Block`, body)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const reportConversation = () => {

    }

    return (
        <div className="chat-dropdown-button">
            <div className="dropdown-toggle-button" onClick={handleOpen}>
                <img className="dropdown-image" src={more}/>
            </div>
            <div className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
                <button className="dropdown-pin" onClick={pinMessage}>
                    Pin Message
                </button>
                <button className="dropdown-off-notification" onClick={offNotification}>
                    Turn Off Notifications
                </button>
                <button className="dropdown-block" onClick={blockConversation}>
                    Block Conversation
                </button>
                <button className="dropdown-report" onClick={reportConversation}>
                    Report Conversation
                </button>
            </div>
        </div>
    );
};

export default ConversationActions;