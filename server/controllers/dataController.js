const db = require('../models/debtlessModel');

const dataController = {};

dataController.addExpense = async (req, res, next) => {
  try{
    const { item, price, category_id } = req.body;
    const { user_id } = req.cookies;
    const created_at = new Date();

    const addExpenseQuery = `INSERT INTO public.expense (item, category_id, price, user_id, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *;`;
    const data = await db.query(addExpenseQuery, [item, category_id, price, user_id, created_at]);
    return next();
  }
  catch(error){
    return next({
      log: `dataController.addExpense middleware ERROR: ${error}`,
      message: { err: 'An error occured on dataController.addExpense'},
    });
  }
};

// dataController.

module.exports = dataController;