import express from "express";
import "./loadEnvironment.mjs";
import cors from 'cors';
import records from './routes/records.mjs';

const PORT = process.env.PORT || 5050

const app = express();
app.use(cors());
app.use(express.json())

app.use(records);

// app.get('/budget', async (req,res) =>  {
//   let collection = await db.collection("budgets");

//   let budget = {
//     "id": 1,
//     "name": 'Uncategoried',
//     "amount": 0
//   }

//   let result = await collection.insertOne(budget)
//   res.send(result).status(204)
// })

// mongoose.connect('mongodb+srv://zencool21:<password>@expensetrackereact.sr9a3jz.mongodb.net/')


app.listen( PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
})