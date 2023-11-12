import React, { useEffect, useState } from "react";
import axios from 'axios';
import ConversationBarItem from "./ConversationBarItem";
import { ChatMessages } from "./ChatMessages";
import { HubConnectionBuilder, HubConnection, HubConnectionState } from "@microsoft/signalr";
import './styles/chatStyle.css';
import ConversationRecipientBar from "./ConversationRecipientBar";
import sendMessage from '../../assets/images/send-message.png';
import { Conversation } from "../Chat/Interfaces/Conversation";
import { ConversationRecipientBarItemProps } from "../Chat/Interfaces/Conversation";
import { MessageProps  } from "../Chat/Interfaces/Messages";


export const ConversationBar: React.FC = () => {
    const [connection, setConnection] = useState<HubConnection | null>();
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConvGuid, setConversationGuid] = useState<string>('');
    const [senderId, setSenderId] = useState<string>('');
    const [recipientId, setRecipientId] = useState<string>('');
    const [messagesData, setMessages] = useState<MessageProps[]>([]);
    const [isConversationBlocked, setIsBlocked] = useState<boolean>(false);
    const [messageText, setMessageText] = useState<string>('');
    const [selectedType, setSelectedType] = useState<string>("Buying");
    const [isRecipintOnline, setOnlineRecipient] = useState<boolean>(false);
    const [isTyping, setIsTyping] = useState(false);
    const [isOnline, setIsOnline] = useState(false);
    const baseUrl = 'https://localhost:7014/api';


    const initialRecipientInfo: ConversationRecipientBarItemProps = {
        isTyping: false,
        isOnline: false,
        conversationGuid: '',
        recipientId: '',
        userName: '',
        avatarPath: '',
        isMuted: false,
        isPinned: false,
        isBlocked: false
    };

    const [conversationRecipientInfo, setConversationRecipentInfo] = useState<ConversationRecipientBarItemProps>(initialRecipientInfo);
    useEffect(() => {
        setSenderId("2a68b90d-fd82-4cab-b15c-2d8fcc2bd05c");

        console.log(senderId);
        if (senderId) {
            setChatConversations();
            initializeChatConnection();
        }
        if (selectedConvGuid) {
            getUserStatus(recipientId);
        }
    }, [senderId]);

    const buyingConversations = conversations.filter(
        (conversation) => conversation.conversationType === "Buying"
    );

    const saleConversations = conversations.filter(
        (conversation) => conversation.conversationType === "Sale"
    );

    const initializeChatConnection = () => {
        const newConnection = new HubConnectionBuilder()
            .withUrl("https://localhost:7014/ChatHub")
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);

        newConnection
            .start()
            .then(() => {
                console.log("Connection to Chat Hub established.");
                newConnection.invoke("SetUserOnline", senderId).then(() => setIsOnline(true));;
                console.log(senderId);
                newConnection.invoke("RegisterClient", senderId);
            })
            .catch((error) => {
                console.error("Error starting the connection:", error);
            });

        newConnection.on("ReceiveMessage", (message) => {
            console.log(message)
            setMessages((messagesData) => [...messagesData, message as MessageProps ]);
        });

        newConnection.on("UserOnline", (userId) => {
            setOnlineRecipient(userId);
        });

        newConnection.on("UserOffline", (userId) => {
            setOnlineRecipient(userId);
        });

        newConnection.onclose((error) => {
            // handle disconnection and mark user as offline
            if (error) {
                console.error("Connection closed due to an error: " + error);
            } else {
                console.log("Connection closed.");
                newConnection.invoke("SetUserOffline", senderId)
                    .then(() => {
                        console.log("User marked as offline.");
                    })
                    .catch((error) => {
                        console.error("Error marking user as offline: " + error);
                    });
            }
        });
    }

    const getUserStatus = async (recipientId: string) => {
        try {
            const status = await connection?.invoke("GetUserStatus", recipientId);
            setOnlineRecipient(status);
            console.log(`User ${recipientId} is online: ${status}`);
        } catch (error) {
            console.error(error);
        }
    };

    const setChatConversations = () => {
        axios.get(baseUrl + '/Conversations/All/Conversations', {
            params: {
                userId: senderId,
                pageNumber: 1,
                pageSize: 10,
            }
        })
            .then((response) => {
                setConversations(response.data);
            })
            .catch((error) => {
                console.error('Error fetching conversations:', error);
            });
    };

    const setChatMessages = () => {
        console.log(selectedConvGuid);
        axios.get(baseUrl + `/Messages/`, {
            params: {
                conversationGuid: selectedConvGuid,
                pageNumber: 1,
            }
        })
            .then((response) => {
                setMessages(response.data);
            })
            .catch((error) => {
                console.error('Error fetching conversations:', error);
            });
    }

    const handleTyping = () => {
        if (connection) {
            setIsTyping(true);
            connection.invoke("StartTyping", selectedConvGuid, senderId)
                .catch(error => {
                    console.error("Error invoking StartTyping:", error);
                });
        } else {
            console.error("Connection is not established.");
        }
    };

    const handleStoppedTyping = () => {
        if (connection) {
            setIsTyping(false);
            connection.invoke("StopTyping", selectedConvGuid, senderId)
                .catch(error => {
                    console.error("Error invoking StopTyping:", error);
                });
        } else {
            console.error("Connection is not established.");
        }
    };

    const handleConversationClick = (conversation: Conversation) => {
        setConversationGuid(conversation?.conversationGuid);

        setRecipientId(conversation.recipientId);
        console.log(selectedConvGuid);
        setIsBlocked(conversation.isBlocked);

        const updatedRecipientInfo: ConversationRecipientBarItemProps = {
            isTyping: isTyping,
            isOnline: isRecipintOnline,
            conversationGuid: conversation.conversationGuid,
            recipientId: conversation.recipientId,
            userName: conversation.userName,
            avatarPath: conversation.avatarPath,
            isMuted: conversation.isMuted,
            isPinned: conversation.isPinned,
            isBlocked: conversation.isBlocked
        };
        setChatMessages();
        setConversationRecipentInfo(updatedRecipientInfo);
    };

    const handleSendMessage = () => {
        if (connection && connection.state === "Connected" && messageText && selectedConvGuid) {
            connection.invoke("SendMessageAsync", senderId, {
                conversationGuid: selectedConvGuid,
                senderId: senderId,
                messageText: messageText,
                messageStatus: 1
            })
                .catch(error => {
                    console.error("Error invoking SendMessageAsync:", error);
                });
            setMessageText('');
            setChatConversations();
        }
    };
    return (
        <div className="chat">
            <div className="conversations">
                <div className="select-conversations">
                    <button
                        className={`${selectedType === 'All' ? 'conversation-selected-button' : 'conversation-unselected-button'}`}
                        onClick={() => setSelectedType('All')}>
                        All
                    </button>
                    <button
                        className={`${selectedType === 'Buying' ? 'conversation-selected-button' : 'conversation-unselected-button'}`}
                        onClick={() => setSelectedType('Buying')}>
                        Buying
                    </button>
                    <button
                        className={`${selectedType === 'Sale' ? 'conversation-selected-button' : 'conversation-unselected-button'}`}
                        onClick={() => setSelectedType('Sale')}>
                        Sale
                    </button>
                </div>
                <div className="conversation-items">
                    {selectedType === "Buying"
                        ? buyingConversations.map((conversation) => (
                            <button className="conversation-button" key={conversation.id} onClick={() => handleConversationClick(conversation)}>
                                <ConversationBarItem
                                    id={conversation.id}
                                    conversationGuid={conversation.conversationGuid}
                                    isPinned={conversation.isPinned}
                                    lastMessageSentAt={conversation.lastMessageSentAt}
                                    recipientId={conversation.recipientId}
                                    fullName={conversation.fullName}
                                    avatarPath={conversation.avatarPath}
                                    lastMessageText={conversation.lastMessageText}
                                />
                            </button>
                        )) : selectedType === 'Sale'
                            ? saleConversations.map((conversation) => (
                                <button className="conversation-button" key={conversation.id} onClick={() => handleConversationClick(conversation)}>
                                    <ConversationBarItem
                                        id={conversation.id}
                                        conversationGuid={conversation.conversationGuid}
                                        isPinned={conversation.isPinned}
                                        lastMessageSentAt={conversation.lastMessageSentAt}
                                        recipientId={conversation.recipientId}
                                        fullName={conversation.fullName}
                                        lastMessageText={conversation.lastMessageText}
                                        avatarPath={conversation.avatarPath}
                                    />
                                </button>
                            ))
                            : (
                                conversations.map((conversation) => (
                                    <button className="conversation-button"
                                        key={conversation.id}
                                        onClick={() => handleConversationClick(conversation)}
                                    >
                                        <ConversationBarItem
                                            id={conversation.id}
                                            conversationGuid={conversation.conversationGuid}
                                            isPinned={conversation.isPinned}
                                            lastMessageSentAt={conversation.lastMessageSentAt}
                                            recipientId={conversation.recipientId}
                                            fullName={conversation.fullName}
                                            lastMessageText={conversation.lastMessageText}
                                            avatarPath={conversation.avatarPath}
                                        />
                                    </button>
                                ))
                            )}
                </div>
            </div>
            <div className="right-side">
                <div className="top-bar">
                    <ConversationRecipientBar
                        isTyping={isTyping}
                        isOnline={isRecipintOnline}
                        recipientId={conversationRecipientInfo?.recipientId}
                        userName={conversationRecipientInfo.userName}
                        avatarPath={conversationRecipientInfo.avatarPath}
                        conversationGuid={conversationRecipientInfo.conversationGuid}
                        isBlocked={conversationRecipientInfo.isBlocked}
                        isPinned={conversationRecipientInfo.isBlocked}
                        isMuted={conversationRecipientInfo.isMuted} />
                </div>
                <div className="messages">
                    <ChatMessages
                        messages={messagesData}
                        isBlocked={isConversationBlocked}
                    />
                </div>
                <div className="user-send">
                    <input
                        className="user-input"
                        type="text"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onInput={() => handleTyping()}
                        onBlur={() => handleStoppedTyping()}
                    />
                    <button className="send-button" onClick={() => handleSendMessage()} >
                        <img className="send-message-icon" src={sendMessage} />
                    </button>
                </div>
            </div>
        </div>
    );
};
