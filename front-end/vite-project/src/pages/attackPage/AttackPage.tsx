import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { updateLocation, launchRocket } from '../../store/features/rocketsSlice';
import { IResource } from '../../types';

const AttackPage: React.FC = () => {

    // const {
    //     connected,
    //     messages,
    //     room,
    //     joinRoom,
    //     leaveRoom,
    //     sendMessageToRoom,
    //     broadcastMessage,
    //     sendRequest,
    //   } = useSocket();

  const dispatch = useDispatch();
  const { organization, location, ammo, launchedRockets } = useSelector((state: RootState) => state.rockets);

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateLocation(e.target.value));
  };

  const handleLaunchRocket = (rocket: IResource) => {
    const timeToHit = '2:42m'; // לשנות לזמן שמשתנה בספירה לאחור
    dispatch(launchRocket({ name: rocket.name, timeToHit }));
  };

  return (
    <div>
      <h2>/Attack-Page</h2>
      <div>
        <h3>Organization: {organization}</h3>
        <label>
          Location:
          <select value={location} onChange={handleLocationChange}>
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="Center">Center</option>
            <option value="West Bank">West Bank</option>
          </select>
        </label>
        <div>
          <h4>Available Ammo</h4>
          <div>
            {ammo.map((rocket) => (
              <button
                key={rocket.name}
                onClick={() => handleLaunchRocket(rocket)}
                disabled={rocket.amount === 0}
              >
                {rocket.name} x {rocket.amount}
              </button>
            ))}
          </div>
        </div>
      </div>

      <h4>Launched Rockets</h4>
      <table cellPadding="5" cellSpacing="0" style={{ marginTop: '10px', width: '100%' }}>
        <thead>
          <tr>
            <th>Rocket</th>
            <th>Time to Hit</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {launchedRockets.map((rocket, index) => (
            <tr key={index}>
              <td>{rocket.name}</td>
              <td>{rocket.timeToHit_in_sec}</td>
              <td>{rocket.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttackPage;
