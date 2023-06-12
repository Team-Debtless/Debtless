import React, { useEffect, useState } from 'react';

const Modal = () => {
  const [modal, setModal] = useState(false);
  const [item, setItem] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState(1);
  const [expenseTableRows, setExpenseTableRows] = useState([]);
  const [latestExpense, setLatestExpense] = useState({});

  const id_key = {
    auto: 1,
    bills: 2,
    dining: 3,
    education: 4,
    entertainment: 5,
    groceries: 6,
    health: 7,
    home: 8,
    loan: 9,
    medical: 10,
    shopping: 11,
    travel: 12,
    misc: 13,
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  const addExpense = (event) => {
    event.preventDefault();
    fetch('/api/expense', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        item: item,
        price: price,
        category_id: category,
      }),
    })
      .then((data) => data.json())
      .then((response) => {
        setLatestExpense(response.expense);
        //window.alert(response.message);
        item.value = '';
        price.value = '';
      })
      .catch((err) => {
        console.log('addExpensePostError', err);
      });
  };

  useEffect(() => {
    fetch('/api/expense')
      .then((data) => data.json())
      .then((response) => {
        console.log('response', response);
        setExpenseTableRows(
          response.expenses.map((el) => {
            {
              /* table data */
            }
            return (
              <tr>
                <td>{el.item}</td>
                <td>{el.price}</td>
                <td>{el.category_name}</td>
                <td>{el.created_at}</td>
              </tr>
            );
          })
        );
        console.log('response.expenses', response.expenses);
      })
      .catch((err) => {
        console.log('addExpenseGetError', err);
      });
  }, [latestExpense]);

  console.log('expenseTableRows', expenseTableRows);

  const handleItem = (e) => {
    setItem(e.target.value);
  };

  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleCategory = (e) => {
    const categoryId = id_key[e.target.value];
    setCategory(categoryId);
  };

  return (
    <>
      <button onClick={toggleModal} className="green-btn">
        Add New Expense
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2 className="sub-title left">Add an expense</h2>
            <div id="expenseContainer">
              <form onSubmit={addExpense}>
                <input
                  id="item"
                  type="text"
                  placeholder="Item"
                  onChange={handleItem}></input>{' '}
                <br></br>
                <input
                  id="price"
                  type="number"
                  placeholder="Price (enter a number)"
                  step=".01"
                  onChange={handlePrice}></input>{' '}
                <br></br>
                <select id="categories" onChange={handleCategory}>
                  <option value="auto">Auto & Transport</option>
                  <option value="bills">Bills & Utilities</option>
                  <option value="dining">Dining & Drinks</option>
                  <option value="education">Education</option>
                  <option value="entertainment">
                    Entertainment & Recreation
                  </option>
                  <option value="groceries">Groceries</option>
                  <option value="health">Health & Wellness</option>
                  <option value="home">Home & Garden</option>
                  <option value="loan">Loan Payment</option>
                  <option value="medical">Medical</option>
                  <option value="shopping">Shopping</option>
                  <option value="travel">Travel & Vacation</option>
                  <option value="misc">Miscellaneous</option>
                </select>
                <br></br>
                <button id="addBtn" className="green-btn">
                  Add
                </button>{' '}
                <br></br>
              </form>
            </div>
            <br></br>
            <button className="grey-btn" onClick={toggleModal}>
              Cancel
            </button>
          </div>
        </div>
      )}
      <table className="expenseTable">
        {/* table rows */}
        <tr>
          {/* table headers */}
          <th>Item</th>
          <th>Price</th>
          <th>Category</th>
          <th>Date/Time</th>
        </tr>
        {expenseTableRows}
      </table>
    </>
  );
};

export default Modal;
