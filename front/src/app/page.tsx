"use client";
import React from "react";
import { io } from "socket.io-client";
import Chat from '../components/Chat';

const socket = io("http://localhost:3001");

const Chats = () => {
  return (
    <div>
      <h1>Chat</h1>
      <Chat socket={socket} />
    </div>
  );
};

export default Chats;
