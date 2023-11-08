import React, { useEffect, useState } from "react";
import RoundedImage from "./RoundedImage";
import './styles/chatStyle.css'
import messageRead from '../../assets/images/readed-message.svg'


const ConversationBarItem: React.FC<ConversationBarItemProps> = ({
    id,
    conversationGuid,
    isPinned,
    lastMessageSentAt,
    lastMessageText,
    recipientId,
    fullName,
    avatarPath }) => {

    function extractHoursAndMinutes(dateTimeString: string): string {
        const date = new Date(dateTimeString);
        const hours = date.getHours();
        const minutes = date.getMinutes();

        const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

        return `${formattedHours}:${formattedMinutes}`;
    }

    const time = extractHoursAndMinutes(lastMessageSentAt);

    return (
        <div className="conversation-item">
            <div className="conversation-item-img">
                <RoundedImage imagePath={avatarPath} height={40} />
            </div>
            <div className="conversation-details">
                <div className="user-info">
                    <p className="conversation-username">{fullName}</p>
                    <p>{lastMessageText}</p>
                </div>
            </div>
            <div className="conversation-message-status">
                <p className="conversation-message-type">{time}</p>
                <img className="conversation-message-read" src={messageRead}></img>
            </div>
        </div>
    );
};

export default ConversationBarItem;
