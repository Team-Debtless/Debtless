const db = require('../models/debtlessModel');
const moment = require('moment');

const dataController = {};

dataController.addExpense = async (req, res, next) => {
  try {
    const { item, price, category_id } = req.body;
    const { user_id } = req.cookies;
    const created_at = moment().format();

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

    let result = [];

    if (data.rows[0]) {
      result = data.rows;
    }
    res.locals.expenses = result;
    return next();
  } catch (error) {
    return next({
      log: `dataController.getExpenses middleware ERROR: ${error}`,
      message: { err: 'An error occured on dataController.getExpenses' },
    });
  }
};

dataController.sumMonthlyExpense = async (req, res, next) => {
  //grabs monthly expense using reduce iterate through expenses
  const { expenses } = res.locals;
  const currentMonth = moment().month(); // June
  const monthlyExpense = expenses.filter(expense => expense.created_at.getMonth() === currentMonth); // [] if no expenses
    
  
  res.locals.monthlyExpense = monthlyExpense.reduce((sum, item) => sum + Number(item.price.replace(/[^0-9\.]+/g, "")), 0);

  const cache = {};

  for (let i = 0; i < monthlyExpense.length; i++) {
    let currentExpense = monthlyExpense[i];

    if (cache[currentExpense.category_name]) {
      cache[currentExpense.category_name] += Number(currentExpense.price.replace(/[^0-9\.]+/g, ""));
    } else {
      cache[currentExpense.category_name] = Number(currentExpense.price.replace(/[^0-9\.]+/g, ""));
    }
  }

  res.locals.categoricalExpense = cache;
  
  return next();
};

dataController.getBudgetIncome = async (req, res, next) => {
  try{
    const { user_id } = req.cookies;

    const budgetIncomeQuery = 'SELECT u.monthly_income, u.monthly_budget FROM public.user u WHERE u._id = $1';
    const data = await db.query(budgetIncomeQuery, [user_id]);

    res.locals.budgetIncome = data.rows[0];
    return next();
  }
  catch(error){
    return next({
      log: `dataController.getBudgetIncome middleware ERROR: ${error}`,
      message: { err: 'An error occured on dataController.getBudgetIncome' },
    });
  }
};

module.exports = dataController;
