import React, { useState } from 'react';


export default function TransactionForm({ onCreate }) {
const [form, setForm] = useState({ customerName: '', customerEmail: '', itemName: '', amount: '', category: 'income' });


const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });


const handleSubmit = async (e) => {
e.preventDefault();
if (!form.customerName || !form.customerEmail || !form.itemName || !form.amount) return alert('Fill all fields');
const payload = { ...form, amount: Number(form.amount) };
await onCreate(payload);
setForm({ customerName: '', customerEmail: '', itemName: '', amount: '', category: 'income' });
};


return (
<form onSubmit={handleSubmit} className="mt-4 bg-white p-4 rounded shadow">
<label className="block text-sm">Customer Name</label>
<input name="customerName" value={form.customerName} onChange={handleChange} className="w-full border p-2 rounded mb-2" />


<label className="block text-sm">Customer Email</label>
<input name="customerEmail" value={form.customerEmail} onChange={handleChange} className="w-full border p-2 rounded mb-2" />


<label className="block text-sm">Item Name</label>
<input name="itemName" value={form.itemName} onChange={handleChange} className="w-full border p-2 rounded mb-2" />


<label className="block text-sm">Item Amount</label>
<input name="amount" value={form.amount} onChange={handleChange} type="number" step="0.01" className="w-full border p-2 rounded mb-2" />


<label className="block text-sm">Category</label>
<select name="category" value={form.category} onChange={handleChange} className="w-full border p-2 rounded mb-4">
<option value="income">Income</option>
<option value="expense">Expense</option>
</select>


<button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded">Send Money</button>
</form>
);
}