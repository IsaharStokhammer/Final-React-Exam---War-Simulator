import React, { useEffect, useState } from 'react';
import { useSocket } from '../../services/useSocket';

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

  const [newAttack, setNewAttack] = useState<string>('');
  const [roomName, setRoomName] = useState<string>(''); // State for room name input

  useEffect(() => {
    if (connected) {
      joinRoom('general'); // Join a default room when connected
    }
  }, [connected]);

  const handleMessageSend = () => {
    if (newAttack.trim()) {
      sendMessageToRoom(newAttack);
      setNewAttack(''); // Clear message input
    }
  };

  return (
    <div className="chat-container">
      <div className="header">
        <div className="room-name">{room || 'General Chat'}</div>
        {room && <button onClick={() => leaveRoom(room)}>Leave</button>}
      </div>
      <div className="messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${typeof msg === 'string' ? 'sent' : 'received'}`}
          >
            {typeof msg === 'string' ? msg : JSON.stringify(msg)}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type a message"
          value={newAttack}
          onChange={(e) => setNewAttack(e.target.value)}
        />
        <button onClick={handleMessageSend}>Send</button>
      </div>

      {/* Room Management Section */}
      <div className="room-management">
        <select
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        >

          <option value="North">North</option>
          <option value="South">South</option>
          <option value="Center">Center</option>
          <option value="West Bank">West Bank</option>
        </select>
        <button onClick={() => joinRoom(roomName)}>בחר איזור לתקיפה</button>
      </div>

      {/* Broadcast Message Section */}
      <div className="broadcast-message">
        <button onClick={() => broadcastMessage(newAttack)}>Broadcast Message</button>
      </div>

      <button onClick={() => sendRequest('Sample data', (response) => console.log('Request callback:', response))}>
        Send Request
      </button>
    </div>
  );
}

export default SocketPage;
