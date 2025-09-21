export default function BalanceCard({ summary }) {
  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-lg font-medium mb-2">Overview</h2>

      {/* Balance */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="text-sm text-gray-500">Current Balance</div>
        <div className="text-3xl font-bold text-gray-800">
          ${summary.balance?.toFixed(2) ?? '0.00'}
        </div>
      </div>

      {/* Income & Expense */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-50 rounded-lg p-3 text-center">
          <div className="text-sm text-green-700">Total Income</div>
          <div className="text-xl font-semibold text-green-900">
            ${summary.income?.toFixed(2) ?? '0.00'}
          </div>
        </div>

        <div className="bg-red-50 rounded-lg p-3 text-center">
          <div className="text-sm text-red-700">Total Expenses</div>
          <div className="text-xl font-semibold text-red-900">
            ${summary.expense?.toFixed(2) ?? '0.00'}
          </div>
        </div>
      </div>
    </div>
  );
}
