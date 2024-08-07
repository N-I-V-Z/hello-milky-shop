import React, { useState, useEffect } from "react";
import axios from "axios";
import ChatWindow from "../../chat/ChatPage";
import "./StaffChat.css";
import Loading from "../../layout/Loading";
import { io } from "socket.io-client";
import config from "../../config/config";

const socket = io(`${config.API_ROOT}`);

function StaffChat() {
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unreadMessageCounts, setUnreadMessageCounts] = useState({});

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await axios.get(`${config.API_ROOT}/api/v1/chat/getAllChatRoom`);
        const rooms = response.data.data;

        const roomsWithUsers = await Promise.all(
          rooms.map(async (room) => {
            const userResponse = await axios.get(`${config.API_ROOT}/api/v1/user/getUserByID?UserID=${room.ChatRoom}`);
            return {
              roomId: room.ChatRoom,
              userName: userResponse.data.data.UserName,
            };
          })
        );

        setChatRooms(roomsWithUsers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching chat rooms", error);
        setLoading(false);
      }
    };

    fetchChatRooms();

    // Listen for unread message count updates
    socket.on("updateUnreadMessageCount", (counts) => {
      setUnreadMessageCounts(counts);
      updateChatRoomsOrder(counts);
    });

    return () => {
      socket.off("updateUnreadMessageCount");
    };
  }, []);

  const updateChatRoomsOrder = (counts) => {
    setChatRooms((prevChatRooms) => {
      const newChatRooms = [...prevChatRooms];
      newChatRooms.sort((a, b) => {
        const countA = counts[a.roomId] || 0;
        const countB = counts[b.roomId] || 0;
        return countB - countA;
      });
      return newChatRooms;
    });
  };

  const handleRoomClick = (roomId, userName) => {
    setSelectedRoom(roomId);
    setSelectedUserName(userName);
    setUnreadMessageCounts((prevCounts) => ({
      ...prevCounts,
      [roomId]: 0,
    }));
  };

  const handleCloseChatWindow = () => {
    setSelectedRoom(null);
    setSelectedUserName(null);
  };

  return (
    <div className="staff-chat-container row">
      <div className="chat-room-list col-md-3">
        <h4>Danh sách khách hàng</h4>
        {loading ? (
          <Loading />
        ) : (
          <ul>
            {chatRooms.map((room) => (
              <li key={room.roomId} onClick={() => handleRoomClick(room.roomId, room.userName)}>
                {room.userName}
                {unreadMessageCounts[room.roomId] > 0 && (
                  <span className="unread-count">{unreadMessageCounts[room.roomId]}</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="chat-window-and-rooms col-md-9">
        <div className="chat-window-container">
          {selectedRoom ? (
            <ChatWindow roomId={selectedRoom} userName={selectedUserName} onClose={handleCloseChatWindow} />
          ) : (
            <div className="tbao-chat-st-thinh">Chọn khách hàng để tư vấn</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StaffChat;
