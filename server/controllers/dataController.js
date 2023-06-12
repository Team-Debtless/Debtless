const db = require('../models/debtlessModel');
const moment = require('moment');

const dataController = {};

dataController.addExpense = async (req, res, next) => {
  try {
    const { item, price, category_id } = req.body;
    const { user_id } = req.cookies;
    const created_at = moment().format();
    console.log(created_at);
    const addExpenseQuery = `INSERT INTO public.expense (item, category_id, price, user_id, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *;`;
    const data = await db.query(addExpenseQuery, [
      item,
      category_id,
      price,
      user_id,
      created_at,
    ]);
    res.locals.expense = data.rows[0];
    return next();
  } catch (error) {
    return next({
      log: `dataController.addExpense middleware ERROR: ${error}`,
      message: { err: 'An error occured on dataController.addExpense' },
    });
  }
};

dataController.getExpenses = async (req, res, next) => {
  try {
    const { user_id } = req.cookies;
    const getExpenseQuery =
      'SELECT e._id AS item_id, e.user_id, e.item, e.price, e.created_at, e.updated_at, e.deleted_at, c.name AS category_name FROM public.expense e INNER JOIN public.category c ON e.category_id = c._id WHERE e.user_id = $1';
    const data = await db.query(getExpenseQuery, [user_id]);
    if (!data.rows[0]) {
      return next({
        log: `dataController.getExpenses ERROR: No expenses found for this user`,
        message: {
          err: 'An error occured on dataController.getExpenses: No expenses found for this user',
        },
      });
    } else {
      res.locals.expenses = data.rows;
      return next();
    }
  } catch (error) {
    return next({
      log: `dataController.getExpenses middleware ERROR: ${error}`,
      message: { err: 'An error occured on dataController.getExpenses' },
    });
  }
};

module.exports = dataController;
