import { useEffect, useState } from "react";
import { Search, Bell, User, Mail } from "lucide-react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/transactions";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ income: 0, expense: 0, balance: 0 });
  const [form, setForm] = useState({
    name: "",
    email: "",
    item: "",
    amount: "",
    category: "income",
  });

  // Fetch transactions on load
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(API_URL);
      setTransactions(res.data);

      // Calculate summary
      const income = res.data
        .filter((t) => t.category === "income")
        .reduce((sum, t) => sum + t.amount, 0);

      const expense = res.data
        .filter((t) => t.category === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

      setSummary({
        income,
        expense,
        balance: income - expense,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTx = {
        customerName: form.name,
        customerEmail: form.email,
        itemName: form.item,
        amount: Number(form.amount),
        category: form.category,
      };

      await axios.post(API_URL, newTx);
      setForm({ name: "", email: "", item: "", amount: "", category: "income" });
      fetchTransactions(); // refresh transactions
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r px-6 py-8 flex flex-col">
        <div className="flex items-center space-x-3 mb-10">
          <h1 className="text-2xl font-bold ">Sinvoice</h1>
        </div>

        <nav className="space-y-4 flex-1">
          {[
            "Dashboard",
            "Invoice",
            "Transactions",
            "Payment",
            "Inbox",
            "Settings",
            "History",
          ].map((item) => (
            <a
              key={item}
              href="#"
              className="block text-gray-600 hover:text-black font-medium"
            >
              {item}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Hello, James</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>
            <Bell className="w-6 h-6 text-gray-600" />
          </div>
        </div>

    
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="p-6 rounded-xl bg-indigo-100">
            <p className="text-gray-600">Balance</p>
            <h2 className="text-2xl font-bold mt-2">
              ${summary.balance.toFixed(2)}
            </h2>
          </div>
          <div className="p-6 rounded-xl bg-green-100">
            <p className="text-gray-600">Income</p>
            <h2 className="text-2xl font-bold mt-2">
              ${summary.income.toFixed(2)}
            </h2>
          </div>
          <div className="p-6 rounded-xl bg-pink-100">
            <p className="text-gray-600">Expenses</p>
            <h2 className="text-2xl font-bold mt-2">
              ${summary.expense.toFixed(2)}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Create Transaction</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex space-x-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Enter customer name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    className="w-full border-b py-2 focus:outline-none text-sm"
                  />
                  <User className="absolute right-0 top-2 w-4 h-4 text-gray-400" />
                </div>
                <div className="flex-1 relative">
                  <input
                    type="email"
                    placeholder="Enter customer email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    className="w-full border-b py-2 focus:outline-none text-sm"
                  />
                  <Mail className="absolute right-0 top-2 w-4 h-4 text-gray-400" />
                </div>
              </div>

              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="Item name"
                  value={form.item}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, item: e.target.value }))
                  }
                  className="flex-1 border-b py-2 focus:outline-none text-sm"
                />
                <input
                  type="number"
                  placeholder="Amount"
                  value={form.amount}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, amount: e.target.value }))
                  }
                  className="w-32 border-b py-2 focus:outline-none text-sm"
                />
              </div>

              <div className="flex space-x-4">
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, category: e.target.value }))
                  }
                  className="flex-1 border-b py-2 focus:outline-none text-sm"
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg bg-black text-white text-sm font-medium"
                >
                  Add More Details
                </button>
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg bg-black text-white text-sm font-medium"
                >
                  Send Money
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h2 className="text-lg font-semibold mb-4">My Cards</h2>
              <div className="bg-black text-white rounded-xl p-6">
                <p className="text-sm">John Demin</p>
                <h3 className="text-2xl font-bold my-2">${summary.balance}</h3>
                <p className="text-sm">3459 **** **** 4356</p>
                <p className="text-xs mt-2">12/20 - 124</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Transaction history</h2>
              </div>
              <ul className="space-y-4">
                {transactions.map((tx) => (
                  <li
                    key={tx._id}
                    className="flex justify-between text-sm border-b pb-2"
                  >
                    <div>
                      <p className="font-medium">{tx.itemName}</p>
                      <p className="text-xs text-gray-500">
                        {tx.customerName} | {tx.customerEmail}
                      </p>
                      <p className="text-xs text-gray-400">{tx.category}</p>
                    </div>
                    <p
                      className={`font-semibold ${
                        tx.category === "income"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {tx.category === "income" ? "+" : "-"}${tx.amount}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
