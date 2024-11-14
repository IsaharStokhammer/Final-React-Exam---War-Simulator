import React, { useEffect, useState } from "react";
import { useSocket } from "../../services/useSocket";
import "./SocketPage.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { IResource } from "../../types";

export function SocketPage() {
  const {
    connected,
    messages,
    room,
    joinRoom,
    leaveRoom,
    lounchRocket,
  } = useSocket();

  const user = useSelector((state: RootState) => state.user.user);
  const userName = user?.userName || "";
  const resources = user?.resources || [];

  const [newAttack, setNewAttack] = useState<string>("");
  const [roomName, setRoomName] = useState<string>("");

  useEffect(() => {
    if (connected) {
      joinRoom("general");
    }
  }, [connected]);

  function handleLaunchRocket(rocket: IResource): void {
    lounchRocket(userName, rocket, room);
  }

  return (
    <div className="attackPage">
        <h1>
            מסך תקיפה
        </h1>
      <div className="header">
        <div className="room-name">{room || "כל האיזורים"}</div>
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

      <div className="rocket-container">
        {resources.map((rocket) => (
          <div key={rocket.name} className="rocket">
            <h3>{rocket.name}</h3> <h3 className="amount">{rocket.amount}</h3>
            <button onClick={() => handleLaunchRocket(rocket)}>Launch</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SocketPage;
