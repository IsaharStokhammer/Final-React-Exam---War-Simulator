import React, { useEffect, useState } from "react";
import { useSocket } from "../../services/useSocket";
import "./SocketPage.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export function SocketPage() {
  const {
    connected,
    messages,
    room,
    joinRoom,
    leaveRoom,
    sendMessageToRoom,
    broadcastMessage,
    sendRequest,
  } = useSocket();

  const user = useSelector((state: RootState) => state.user.user);

  const resources = user?.resources || [];

  const [newAttack, setNewAttack] = useState<string>("");
  const [roomName, setRoomName] = useState<string>(""); // State for room name input

  useEffect(() => {
    if (connected) {
      joinRoom("general"); // Join a default room when connected
    }
  }, [connected]);

  const handleMessageSend = () => {
    if (newAttack.trim()) {
      sendMessageToRoom(newAttack);
      setNewAttack(""); // Clear message input
    }
  };

  return (
    <div className="chat-container">
      <div className="header">
        <div className="room-name">{room || "כל האיזורים"}</div>
        {/* Room Management Section */}
        <div className="room-management">
          <label htmlFor="room-select">בחר איזור לתקיפה:</label>
          <select
            id="room-select"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          >
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="Center">Center</option>
            <option value="West Bank">West Bank</option>
          </select>
          <button onClick={() => joinRoom(roomName)}>בחר</button>
        </div>
      </div>
      {room && (
        <button onClick={() => leaveRoom(room)}>חזור למצב כל האיזורים</button>
      )}
      <div className="messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              typeof msg === "string" ? "sent" : "received"
            }`}
          >
            {typeof msg === "string" ? msg : JSON.stringify(msg)}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="הכנס את שם הטיל"
          value={newAttack}
          onChange={(e) => setNewAttack(e.target.value)}
        />
        <button onClick={handleMessageSend}>Send</button>
      </div>

      <button
        onClick={() =>
          sendRequest("Sample data", (response) =>
            console.log("Request callback:", response)
          )
        }
      >
        Send FUNCTION
      </button>
    </div>
  );
}

export default SocketPage;
