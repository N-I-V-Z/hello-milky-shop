import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import "./ChatPage.css";
import { getUserIdFromToken } from "../store/actions/authAction";
import config from "../config/config";
import { AES, enc } from 'crypto-js';

const socket = io(`${config.API_ROOT}`);

function ChatWindow({ roomId, userName, onClose }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const { token } = useSelector((state) => state.auth);
  const decryptedToken = token ? AES.decrypt(token, config.SECRET_KEY).toString(enc.Utf8) : null;
  const userId = getUserIdFromToken(decryptedToken);
  const messagesEndRef = useRef(null);
  const messageListRef = useRef(null);

  useEffect(() => {
    const handleNewMessage = (msg) => {
      if (msg.userId !== userId) {
        setMessages((prevMessages) => [...prevMessages, msg]);
      }
    };
    const fetchChatHistory = async () => {
      try {
        const response = await fetch(
          `${config.API_ROOT}/api/v1/chat/getAllMessageByChatRoom`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ChatRoom: roomId }),
          }
        );
        const result = await response.json();
        console.log(result);
        if (result.err === 1 && result.data.length === 0) {
          setMessages([]);
        } else if (result.err === 0) {
          const messages = result.data.map((msg) => ({
            content: msg.Message,
            userId: msg.UserID,
            userName: msg.UserName,
          }));
          setMessages(messages);
        } else {
          console.error("Error fetching chat history:", result.err);
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchChatHistory();
    socket.emit("joinRoom", roomId);

    // Register event listeners when component mounts
    socket.on("connect", () => console.log("Connected to server"));
    socket.on("chat message", handleNewMessage);

    return () => {
      socket.emit("leaveRoom", roomId);
      socket.off("connect");
      socket.off("chat message", handleNewMessage);
    };
  }, [roomId, userId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim() !== "") {
      const message = {
        content: inputMessage,
        userId,
        roomId,
      };
      socket.emit("chat message", message);
      setMessages((prevMessages) => [...prevMessages, message]);
      setInputMessage("");
    }
  };

  return (
    <div className="chat-window-Nhan">
      <div className="chat-header-Nhan">
        <span>{userName}</span>
        <button onClick={onClose}>×</button>
      </div>
      <ul className="message-list-Nhan" ref={messageListRef}>
        {messages.map((msg, index) => (
          <li
            key={index}
            className={
              msg.userId === userId
                ? "message-list-own-Nhan"
                : "message-list-other-Nhan"
            }
          >
            <div className="message-content">{msg.content}</div>
          </li>
        ))}
        <div ref={messagesEndRef} />
      </ul>
      <form className="input-area-Nhan" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button type="submit">Gửi</button>
      </form>
    </div>
  );
}

ChatWindow.propTypes = {
  roomId: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ChatWindow;
