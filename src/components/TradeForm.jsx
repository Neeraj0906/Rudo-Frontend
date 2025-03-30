import React, { useState } from 'react';
import { buyStock, sellStock } from '../services/api';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const TradeForm = () => {
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
  );
};

export default TradeForm;