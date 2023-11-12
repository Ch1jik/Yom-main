import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import ConversationActions from "./ConversationActions";
import trash from "../../assets/images/chat-trash.svg";
import search from "../../assets/images/search-icon.svg";
import RoundedImage from "./RoundedImage";
import axios from 'axios';
import './styles/recipientBar.css';
import { ConversationRecipientBarItemProps } from "../Chat/Interfaces/Conversation";

export const ConversationRecipientBar: React.FC<ConversationRecipientBarItemProps> = ({
    isTyping,
    isOnline,
    conversationGuid,
    recipientId,
    userName,
    avatarPath,
    isMuted,
    isPinned,
    isBlocked }) => {
    const baseUrl = 'https://localhost:7014/api';
    const deleteConversation = (currentConversationGuid: string) => {
        const body = {
            conversationGuid: currentConversationGuid
        }
        axios.post(baseUrl + `/Conversations/DeleteConversations`, body)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }
    return (
        <div className="recipient-bar">
            <Link className="recipient-img" to={`/userpage/${recipientId}`}>
                <RoundedImage imagePath={avatarPath} height={40} />
            </Link>
            <div className="recipient-info">
                <p className="username">{userName}</p>
                <p className="online-user">{isOnline != null ? "Offline" : "Online"}</p>
            </div>
            <div className="recipient-action">
                <div className="recipient-button-img">
                    <img src={search} />
                </div>
                <div className="recipient-button-img">
                    <img onClick={() => deleteConversation(conversationGuid)} src={trash} />
                </div>
                <div className="recipient-chat-action">
                    <ConversationActions conversationGuid={conversationGuid} isBlocked={isBlocked} isMuted={isMuted} isPinned={isPinned} />
                </div>
            </div>
        </div>
    );
};

export default ConversationRecipientBar;