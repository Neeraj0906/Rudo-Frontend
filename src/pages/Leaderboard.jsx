import React, { useState, useEffect } from 'react';
import { getLeaderboard } from '../services/api';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Leaderboard = () => {
  const { token } = useContext(AuthContext);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await getLeaderboard(token);
        setLeaderboard(response.data.leaderboard);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
      }
    };

    fetchLeaderboard();
  }, [token]);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {leaderboard.map((user, index) => (
          <li key={index}>
            {user.username} - Net Worth: ₹{user.totalNetWorth.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard; // Ensure this is a default export