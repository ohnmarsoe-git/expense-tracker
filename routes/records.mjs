import express from "express";
import db from '../db/conn.mjs'
import { ObjectId } from 'mongodb';

const router = express.Router();

router.get('/income', async(req, res) => {
  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).toISOString();
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString();

  let collection = await db.collection('income');
  let results = await collection.find({
    "date": {
      $gt: firstDay,
      $lt: lastDay
    }
  }).toArray();

  res.send(results).status(200);
})

router.get('/budgets', async(req, res) => {
  let collection = await db.collection('budgets');
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
})

router.get('/expenses', async(req, res) => {
  let collection = await db.collection('expenses');
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
})

router.get('/expensesbycategory', async(req, res) => {
  let collection = await db.collection('expenses');
  let results = await collection.find({
    "budget": req.query.category
  }).toArray();
  res.send(results).status(200);
})

router.get('/expensesfilter', async(req, res) => {
  const startDate = req.query.startDate
  const endDate = req.query.endDate

  let collection = await db.collection('expenses');
  let results = await collection.find({
    "createdAt": {
      $gt: startDate,
      $lt: endDate
    }
  }).toArray();

  res.send(results).status(200);
})

router.post('/income', async(req, res) => {
  
  let newIncome =  {
    amount: req.body.amount,
    date: req.body.date
  }

  let connection = await db.collection('income');
  let result = await connection.insertOne(newIncome);
  res.send({
    result: result,
    data: newIncome
  }).status(204)
})

router.post('/budget', async(req, res) => {

  let newBudget =  {
    name: req.body.name,
    amount: req.body.amount
  }

  let collection = await db.collection('budgets');
  let result = await collection.insertOne(newBudget);
  res.send({
    result: result,
    data: req.body
  }).status(204);
  // try {
  //   let result = collection.createIndex({newBudget}, {unique: true})
  //   res.send(result).status(204)
  // } catch (error) {
  //   if(error.code === 67 ) throw new Error('duplicate budget')
  // }
  
})

router.post('/expense', async(req, res) => {
  
  let newExpense =  {
    name: req.body.name,
    amount: req.body.amount,
    budget: req.body.budget,
    createdAt: req.body.createdAt
  }

  let collection = await db.collection('expenses');
  let result = await collection.insertOne(newExpense);
  res.send({
    result: result,
    data: req.body
  }).status(204);
})

router.delete('/expense', async(req, res) => {
const id = req.query.id;
let collection = await db.collection('expenses');
let result = await collection.deleteOne({"_id": new ObjectId(id)});
res.send({
  result: result,
  data: req.body
}).status(204);
})

export default router;