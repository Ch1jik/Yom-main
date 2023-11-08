import React, { useEffect, useState } from "react";
import Message from "./Message";


export const ChatMessages: React.FC<Messages> = ({ messages, isBlocked, avatarPath, userAvatar, username }) => {

    if (!messages) {
        return <div>No messages available</div>;
    }
    if (isBlocked) {
        return <div>Chat is bloked</div>;
    }

    return (
        <div>
            {messages.map((message) => (
                <Message
                    key={message.id}
                    id={message.id}
                    messageText={message.messageText}
                    senderId={message.senderId}
                    messageStatus={message.messageStatus}
                    sentAt={message.sentAt}
                    avatarPath={avatarPath}
                    userAvatar={userAvatar}
                    username={username} />
            ))}
        </div>
    );
}