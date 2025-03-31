import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthForm = ({ type }) => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { register, login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (type === 'register') {
        await register(formData);
      } else {
        await login(formData);
      }
      setError('');
      setSuccess(`${type === 'register' ? 'Registration' : 'Login'} successful`);
      if (type === 'login') {
        navigate('/dashboard'); // Redirect to dashboard after login
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
      setSuccess('');
    }
  };

  return (
    <div>
      {/* Inline Styles */}
      <style>
        {`
          .auth-form {
            max-width: 400px;
            margin: 50px auto;
            padding: 2rem;
            background: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            text-align: center;
          }

          .input-field {
            width: 100%;
            padding: 0.8rem;
            margin: 0.5rem 0;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 1rem;
          }

          .submit-btn {
            width: 100%;
            padding: 0.8rem;
            margin-top: 1rem;
            background: #282c34;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 1rem;
            cursor: pointer;
          }

          .submit-btn:hover {
            background: #1a1f29;
          }

          .link {
            color: #282c34;
            text-decoration: none;
          }

          .link:hover {
            text-decoration: underline;
          }
        `}
      </style>

      <div className="auth-form">
        <h2>{type === 'register' ? 'Register' : 'Login'}</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <form onSubmit={handleSubmit}>
          {type === 'register' && (
            <input
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="input-field"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="input-field"
          />
          <button type="submit" className="submit-btn">
            {type === 'register' ? 'Register' : 'Login'}
          </button>
        </form>

        {/* Navigation Links */}
        <p>
          {type === 'login'
            ? "Don't have an account? "
            : 'Already have an account? '}
          <Link to={type === 'login' ? '/register' : '/'} className="link">
            {type === 'login' ? 'Register' : 'Login'}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;