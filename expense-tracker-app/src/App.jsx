
import Dashboard from './components/Dashboard';
import Expense from './components/Expense';
import SideMenu from './components/SideMenu';
import TransactionHistory from './components/TransactionHistory';

function App() {

  return (
    <>
      <div>
       <Dashboard/>
      </div>
    </>
  )
}

export default App;

// import React, { useEffect, useState } from "react";
// import TransactionForm from "./components/TransactionForm";
// import TransactionList from "./components/TransactionList";
// import BalanceCard from "./components/BalanceCard";
// import { fetchTransactions, createTransaction, fetchSummary } from "./api";

// export default function App() {
//   const [transactions, setTransactions] = useState([]);
//   const [summary, setSummary] = useState({
//     totalIncome: 0,
//     totalExpense: 0,
//     balance: 0,
//   });

//   const load = async () => {
//     try {
//       const res = await fetchTransactions();
//       setTransactions(res.data);
//       const s = await fetchSummary();
//       setSummary(s.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   const onCreate = async (payload) => {
//     try {
//       const res = await createTransaction(payload);
//       // optimistic update — new transaction appears instantly
//       setTransactions((prev) => [res.data, ...prev]);

//       // recompute summary locally instead of refetch: faster UX
//       setSummary((prev) => {
//         const totalIncome =
//           prev.totalIncome +
//           (res.data.category === "income" ? res.data.amount : 0);
//         const totalExpense =
//           prev.totalExpense +
//           (res.data.category === "expense" ? res.data.amount : 0);
//         const balance = totalIncome - totalExpense;
//         return { totalIncome, totalExpense, balance };
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-5xl mx-auto">
//         <h1 className="text-2xl font-semibold mb-4">Expense Tracker</h1>
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <div className="lg:col-span-1">
//             <BalanceCard summary={summary} />
//             <TransactionForm onCreate={onCreate} />
//           </div>
//           <div className="lg:col-span-2">
//             <TransactionList transactions={transactions} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
