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
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button type="submit">{type === 'register' ? 'Register' : 'Login'}</button>
      </form>

      {/* Navigation Links */}
      <p>
        {type === 'login'
          ? "Don't have an account? "
          : 'Already have an account? '}
        <Link to={type === 'login' ? '/register' : '/'}>{type === 'login' ? 'Register' : 'Login'}</Link>
      </p>
    </div>
  );
};

export default AuthForm;