import React from 'react';
import Modal from './expense_modal';
import Link from '../components/Link';

const Expenses = () => {
  return (
    <div className="page">
      <div>
      <h2 className="title left">Expenses</h2>
      <Link/>
      </div>
      <Modal />
    </div>
  );
};

export default Expenses;
