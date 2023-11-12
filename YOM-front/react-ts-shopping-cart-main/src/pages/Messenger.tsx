import React, { useEffect, useState } from "react";
import axios from 'axios';
import ConversationBarItem from '../components/Chat/ConversationBarItem';
import { ChatMessages } from "../components/Chat/ChatMessages";
import { HubConnectionBuilder, HubConnection, HubConnectionState } from "@microsoft/signalr";
import '../components/Chat/styles/chatStyle.css';
import ConversationRecipientBar from "../components/Chat/ConversationRecipientBar";
import sendMessage from '../assets/images/send-message.png'
import { useParams } from "react-router-dom";
import { Conversation } from "../components/Chat/Interfaces/Conversation";
import { ConversationRecipientBarItemProps } from "../components/Chat/Interfaces/Conversation";
import { MessageProps } from "../components/Chat/Interfaces/Messages";

interface MessengerProps {
  createConversationRecipient: string | null;
}
interface UserConversation {
  id: number;
  conversationGuid: string;
  isMuted: boolean;
  isPinned: boolean;
  conversationType: string;
  isBlocked: boolean;
  lastMessageSentAt: string;
}

export const Messenger: React.FC = () => {
  const [connection, setConnection] = useState<HubConnection | null>();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [newConversationGuid, setNewConversation] = useState<string>();
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
  const { createConversationRecipient } = useParams<{ createConversationRecipient: string }>();

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
    const storedUserId = sessionStorage.getItem('userId');
    if (storedUserId) {
      console.log(storedUserId)
      setSenderId(storedUserId);
    }
    initializeChatConnection();
    if (senderId) {
      setChatConversations();
      if (createConversationRecipient) {
        console.log(`Create conversation ${createConversationRecipient}`);
        setRecipientId(createConversationRecipient);
        getUserLinkChat();
      }
    }
    if (selectedConvGuid) {
      getUserStatus(recipientId);
    }
    connection?.invoke("RegisterClient", senderId);

  }, [senderId]);

  useEffect(() => {
    if (selectedConvGuid) {
      getUserStatus(recipientId);
    }
  }, [isRecipintOnline])
  useEffect(() => {
    if (createConversationRecipient) {
      console.log(`Create conversation ${createConversationRecipient}`);
      setRecipientId(createConversationRecipient);
      getUserLinkChat();
    }
    connection?.invoke("RegisterClient", senderId);

  }, [newConversationGuid]);
  const getUserLinkChat = () => {
    console.log(`Create conversation link ${createConversationRecipient}`);
    axios.post(baseUrl + `/Conversations/CreateConversation`,
      {
        senderId: senderId,
        recipientId: createConversationRecipient,
        conversationType: "Buying"
      })
      .then(response => {
        const conversationData = response.data;
        console.log("--------");


        setNewConversation(conversationData.conversationGuid as string);

        console.log("----------");

        console.log(newConversationGuid);
        if (newConversationGuid)
          getConversation(senderId, newConversationGuid);
      })
      .catch(error => {
        console.error(error);
      });
  }

  const getConversation = (sender: string, convG: string) => {
    axios.get(baseUrl + '/Conversations/Conversation', {
      params: {
        userId: senderId,
        conversationGuid: newConversationGuid
      }
    })
      .then((response) => {

        const conversationData = response.data;
        setConversationGuid(conversationData.conversationGuid);
        handleConversationClick(conversationData);
        setMessages((conversations) => [...conversations, conversationData]);
      })
      .catch((error) => {
        console.error('Error fetching conversations:', error);
      });
    connection?.invoke("RegisterClient", senderId);
  }
  const buyingConversations = conversations
    .filter((conversation) => conversation.conversationType === "Buying")
    .sort((a, b) => {
      // Parse the string dates into Date objects
      const dateA = new Date(a.lastMessageSentAt);
      const dateB = new Date(b.lastMessageSentAt);

      // Compare the Date objects
      // Sort in descending order, modify the comparison for ascending order
      return dateB.getTime() - dateA.getTime();
    });

  const saleConversations = conversations
    .filter((conversation) => conversation.conversationType === "Sale")
    .sort((a, b) => {
      // Parse the string dates into Date objects
      const dateA = new Date(a.lastMessageSentAt);
      const dateB = new Date(b.lastMessageSentAt);

      // Compare the Date objects
      // Sort in descending order, modify the comparison for ascending order
      return dateB.getTime() - dateA.getTime();
    });

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
        newConnection.invoke("SetUserOnline", senderId).then(() => setIsOnline(true));
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

  const setChatMessages = (selectedConv: string) => {
    axios.get(baseUrl + `/Messages/`, {
      params: {
        conversationGuid: selectedConv,
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

  function handleConversationClick(conversation: Conversation) {
    setConversationGuid(conversation?.conversationGuid);
    setRecipientId(conversation.recipientId);
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
    setChatMessages(conversation.conversationGuid);
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
            Усі
          </button>
          <button
            className={`${selectedType === 'Buying' ? 'conversation-selected-button' : 'conversation-unselected-button'}`}
            onClick={() => setSelectedType('Buying')}>
            Покупки
          </button>
          <button
            className={`${selectedType === 'Sale' ? 'conversation-selected-button' : 'conversation-unselected-button'}`}
            onClick={() => setSelectedType('Sale')}>
            Продажі
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
                conversations.sort((a, b) => {
                  const dateA = new Date(a.lastMessageSentAt);
                  const dateB = new Date(b.lastMessageSentAt);
                  return dateB.getTime() - dateA.getTime();
                }).map((conversation) => (
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
          <ChatMessages messages={messagesData} isBlocked={isConversationBlocked} />
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

export default Messenger;