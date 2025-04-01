import React, { useEffect, useState } from 'react';
import { getPortfolio, getLeaderboard } from '../services/api';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { token, userId } = useContext(AuthContext); // Get token and userId from context
  const [portfolio, setPortfolio] = useState([]); // Initialize as an empty array
  const [walletBalance, setWalletBalance] = useState(100000); // Default balance
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token || !userId) {
          console.error('Token or userId is missing');
          return;
        }

        // Fetch portfolio
        const portfolioResponse = await getPortfolio(token, userId);
        console.log('Portfolio Response:', portfolioResponse.data);

        const portfolioData = Array.isArray(portfolioResponse.data.portfolio)
          ? portfolioResponse.data.portfolio
          : [];
        setPortfolio(portfolioData);

        const fetchedWalletBalance = portfolioResponse.data.walletBalance ?? 100000; // Default to 100000 if missing
        setWalletBalance(fetchedWalletBalance);

        // Fetch leaderboard
        const leaderboardResponse = await getLeaderboard(token);
        console.log('Leaderboard Response:', leaderboardResponse.data);

        const leaderboardData = Array.isArray(leaderboardResponse.data.leaderboard)
          ? leaderboardResponse.data.leaderboard
          : [];
        setLeaderboard(leaderboardData);
      } catch (err) {
        console.error('Error fetching data:', err.response?.data?.message || err.message);
      } finally {
        setLoading(false); // Stop loading after data fetch
      }
    };

    fetchData();
  }, [token, userId]);

  if (loading) {
    return <p>Loading...</p>; // Show a loading indicator while fetching data
  }

  return (
    <div>
      {/* Inline Styles */}
      <style>
        {`
          .dashboard-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            text-align: center;
          }

          .balance {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: #333;
          }

          .section {
            margin-top: 2rem;
          }

          .section h3 {
            margin-bottom: 1rem;
            color: #282c34;
          }

          ul {
            list-style: none;
            padding: 0;
          }

          li {
            background: #f9f9f9;
            margin: 0.5rem 0;
            padding: 0.8rem;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
        `}
      </style>

      <div className="dashboard-container">
        <h2>Dashboard</h2>
        {/* Safely render wallet balance */}
        <p className="balance">Wallet Balance: ₹{(walletBalance || 0).toFixed(2)}</p>

        <div className="section">
          <h3>Portfolio</h3>
          {/* Validate portfolio before rendering */}
          {portfolio.length > 0 ? (
            <ul>
              {portfolio.map((item, index) => (
                <li key={index}>
                  {item.stockSymbol} - Quantity: {item.quantity}, Value: ₹{item.totalValue.toFixed(2)}
                </li>
              ))}
            </ul>
          ) : (
            <p>No stocks in your portfolio.</p>
          )}
        </div>

        <div className="section">
          <h3>Leaderboard</h3>
          {/* Validate leaderboard before rendering */}
          {leaderboard.length > 0 ? (
            <ul>
              {leaderboard.map((user, index) => (
                <li key={index}>
                  {user.username} - Net Worth: ₹{(user.totalNetWorth || 0).toFixed(2)}
                </li>
              ))}
            </ul>
          ) : (
            <p>No users on the leaderboard yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;