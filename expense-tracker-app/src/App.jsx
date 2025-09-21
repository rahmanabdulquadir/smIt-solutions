import './App.css'
import Expense from './components/Expense';
import SideMenu from './components/SideMenu';
import TransactionHistory from './components/TransactionHistory';

function App() {

  return (
    <>
      <div>
        <SideMenu/>
        <Expense/>
        <TransactionHistory/>
      </div>
    </>
  )
}

export default App;
