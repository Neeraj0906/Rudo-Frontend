import React, { useState, useEffect } from 'react';
import { getLeaderboard } from '../services/api';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Leaderboard = () => {
  const { token } = useContext(AuthContext);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        if (!token) {
          console.error('Token is missing');
          return;
        }

        const response = await getLeaderboard(token);
        console.log('Leaderboard Response:', response.data);

        const leaderboardData = Array.isArray(response.data.leaderboard)
          ? response.data.leaderboard
          : [];
        setLeaderboard(leaderboardData);
      } catch (err) {
        console.error('Error fetching leaderboard:', err.response?.data?.message || err.message);
      } finally {
        setLoading(false); // Stop loading after data fetch
      }
    };

    fetchLeaderboard();
  }, [token]);

  if (loading) {
    return <p>Loading leaderboard...</p>; // Show a loading indicator
  }

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {leaderboard.length > 0 ? (
          leaderboard.map((user, index) => (
            <li key={index}>
              {user.username} - Net Worth: ₹{user.totalNetWorth.toFixed(2)}
            </li>
          ))
        ) : (
          <p>No users on the leaderboard yet.</p>
        )}
      </ul>
    </div>
  );
};

export default Leaderboard;