import React, { useEffect, useState } from "react";
import { useSocket } from "../../services/useSocket";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { IResource } from "../../types";
import "./DefensePage.css"

export function DefensePage() {
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
    <div className="DefensePage">
        <h1>
            מסך הגנה
        </h1>
      <div className="header">
        <div className="room-name">{room || "תקלה: לא מוגדר איזור הגנה"}</div>


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
    </div>
  );
}

export default DefensePage;
