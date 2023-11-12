import React, { useEffect, useState } from "react";
import "./styles/messagesStyle.css"
import RoundedImage from "./RoundedImage";
import { MessageProps  } from "../Chat/Interfaces/Messages";

export const Message: React.FC<MessageProps> = ({
  id,
  senderId,
  messageText,
  sentAt,
  messageStatus, avatarPath, userAvatar, username }) => {


  const storedUserId = sessionStorage.getItem('userId');

  function extractHoursAndMinutes(dateTimeString: string): string {
    const date = new Date(dateTimeString);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

    return `${formattedHours}:${formattedMinutes}`;
  }

  const time = extractHoursAndMinutes(sentAt);

  const isCurrentUser = storedUserId === senderId;
  const displayName = isCurrentUser ? "You" : username;
  const image = isCurrentUser ? avatarPath : userAvatar;
  return (
    <div className={isCurrentUser ? "right-message-container" : "message-container"}>
      <div className={isCurrentUser ? "right-message-nickname" : "message-nickname"}>{displayName}</div>
      <div className={isCurrentUser ? "right-character-picture" : "character-picture"}>
        <RoundedImage imagePath={image} height={40} />
      </div>
      <div className={isCurrentUser ? "right-speech-bubble" : "speech-bubble"}>
        <div className={isCurrentUser ? "right-message" : "message"}>{messageText}</div>
      </div>
      <div className={isCurrentUser ? "right-lower-text" : "lower-text"}>{time}</div>
    </div>
  );
};
export default Message;
