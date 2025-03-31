import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to login after logout
  };

  return (
    <nav>
      {/* Inline Styles */}
      <style>
        {`
          .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem;
            background: #282c34;
            color: white;
          }

          .logo h1 {
            margin: 0;
            font-size: 1.5rem;
          }

          .nav-links ul {
            display: flex;
            gap: 1rem;
            list-style: none;
          }

          .nav-link {
            color: white;
            text-decoration: none;
          }

          .nav-link::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0;
            height: 2px;
            background: white;
            transition: width 0.3s ease;
          }

          .nav-link:hover::after {
            width: 100%;
          }

          .logout-btn {
            background: transparent;
            color: white;
            border: 1px solid white;
            padding: 0.5rem 1rem;
            border-radius: 5px;
            cursor: pointer;
          }

          .logout-btn:hover {
            background: white;
            color: #282c34;
          }
        `}
      </style>

      <div className="navbar">
        <div className="logo">
          <h1>Stock Trading Platform</h1>
        </div>
        {user && (
          <div className="nav-links">
            <ul>
              <li>
                <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/trade" className="nav-link">
                  Trade
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="nav-link">
                  Leaderboard
                </Link>
              </li>
            </ul>
            <div className="user-actions">
              <span>Welcome, {user}</span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;