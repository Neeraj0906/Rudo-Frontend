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
    <nav style={{ padding: '1rem', backgroundColor: '#282c34', color: 'white' }}>
      <h1>Stock Trading Platform</h1>
      {user ? (
        <div>
          <span>Welcome, {user}</span>
          <button onClick={handleLogout} style={{ marginLeft: '1rem' }}>Logout</button>
        </div>
      ) : null}
      {user && (
        <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem' }}>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/trade">Trade</Link></li>
          <li><Link to="/leaderboard">Leaderboard</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;