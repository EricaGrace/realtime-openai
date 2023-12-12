import React from "react";

// Définition de l'interface IMessage
export interface IMessage {
  username: string;
  content: string;
  timeSent: string;
}

// Définition de l'interface Props pour le composant Message
interface Props {
  message: IMessage;
  isMe: boolean;
}

// Définition du composant Message
const Message = ({ message, isMe }: Props) => {
  return (
    <div className={`chat ${isMe ? "chat-end" : "chat-start"}`}>
      <div className="chat-header">
        {message.username}
        <time className="text-xs opacity-50">{message.timeSent}</time>
      </div>
      <div
        className={`chat-bubble ${
          isMe ? "chat-bubble-primary" : "chat-bubble-secondary"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
};

export default Message;

  