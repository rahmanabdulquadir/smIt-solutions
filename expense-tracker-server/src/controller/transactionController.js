import Transaction from '../model/Transaction.js';


export const createTransaction = async (req, res) => {
try {
const { customerName, customerEmail, itemName, amount, category } = req.body;
const tx = await Transaction.create({ customerName, customerEmail, itemName, amount, category });
return res.status(201).json(tx);
} catch (err) {
console.error(err);
return res.status(500).json({ error: 'Server error' });
}
};


export const getAllTransactions = async (req, res) => {
try {
const txs = await Transaction.find().sort({ createdAt: -1 });
return res.json(txs);
} catch (err) {
console.error(err);
return res.status(500).json({ error: 'Server error' });
}
};


export const getSummary = async (req, res) => {
try {
const incomes = await Transaction.aggregate([
{ $match: { category: 'income' } },
{ $group: { _id: null, total: { $sum: '$amount' } } }
]);


const expenses = await Transaction.aggregate([
{ $match: { category: 'expense' } },
{ $group: { _id: null, total: { $sum: '$amount' } } }
]);


const totalIncome = incomes[0] ? incomes[0].total : 0;
const totalExpense = expenses[0] ? expenses[0].total : 0;
const balance = totalIncome - totalExpense;


return res.json({ totalIncome, totalExpense, balance });
} catch (err) {
console.error(err);
return res.status(500).json({ error: 'Server error' });
}
};