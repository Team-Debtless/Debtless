import React, { useState, useEffect } from 'react';
import Modal from './expense_modal';
import Link from '../components/Link';

const Expenses = () => {

  const [linkToken, setLinkToken] = useState(null);

  const generateToken = async () => {
    const response = await fetch('/plaid/create_link_token', {
      method: 'POST',
    });
    const data = await response.json();
    setLinkToken(data.link_token);
  };

  useEffect(() => {
    generateToken();
  }, []);

  return (
    <div className="page">
      <div>
      <h2 className="title left">Expenses</h2>
      <Link linkToken={ linkToken }/>
      </div>
      <Modal />
    </div>
  );
};

export default Expenses;
