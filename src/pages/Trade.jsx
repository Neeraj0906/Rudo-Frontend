import React, { useState } from 'react';
import { buyStock, sellStock } from '../services/api';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Trade = () => {
  const { token } = useContext(AuthContext);
  const [formData, setFormData] = useState({ stockSymbol: '', quantity: 0, type: 'BUY' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (formData.type === 'BUY') {
        response = await buyStock(token, formData);
      } else {
        response = await sellStock(token, formData);
      }
      setMessage(response.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div>
      {/* Inline Styles */}
      <style>
        {`
          .trade-form {
            max-width: 400px;
            margin: 50px auto;
            padding: 2rem;
            background: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            text-align: center;
          }

          input, select {
            width: 100%;
            padding: 0.8rem;
            margin: 0.5rem 0;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 1rem;
          }

          button {
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

          button:hover {
            background: #1a1f29;
          }

          p {
            margin-top: 1rem;
            color: #333;
          }
        `}
      </style>

      <div className="trade-form">
        <h2>Place Order</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Stock Symbol"
            value={formData.stockSymbol}
            onChange={(e) => setFormData({ ...formData, stockSymbol: e.target.value })}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
          />
          <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
            <option value="BUY">BUY</option>
            <option value="SELL">SELL</option>
          </select>
          <button type="submit">Submit</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Trade;