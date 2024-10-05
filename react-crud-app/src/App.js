import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import { useState } from "react";

function App() {
  const [expenses, setExpenses] = useState([
    { id: 1, charge: "렌트비", amount: 1500 },
    { id: 2, charge: "교통비", amount: 3000 },
  ]);

  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState(0);

  const [id, setId] = useState('');

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (id) => {
    const expense = expenses.find(expense => expense.id === id) // 클릭한 요소와 id가 같은 요소 찾음
    const { charge, amount } = expense; // 구조분해할당
    setCharge(charge);
    setAmount(amount);
    setId(id);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(newExpenses);
  };

  const handleAllDelete = (id) => {
    setExpenses([]);
  };

  const handleCharge = (e) => {
    setCharge(e.target.value);
  };

  const handleAmount = (e) => {
    setAmount(e.target.valueAsNumber);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== "" && amount > 0) { //유효성 체크
      if (isEditing) {
          const newExpenses = expenses.map(item => {
            return item.id === id ? {...item, charge, amount} : item; // 선택한 요소 오버라이딩 하기
          })
          setExpenses(newExpenses);
          setIsEditing(false);

      } else {
        const newExpense = {
          id: crypto.randomUUID(),
          charge,
          amount,
        };
        const newExpenses = [...expenses, newExpense];
        setExpenses(newExpenses);
      }
      setCharge("");
      setAmount(0);
    } else {
      alert("");
    }
  };
  return (
    <main>
      <h1>예산 계산기</h1>

      <div>
        <ExpenseForm
          isEditing={isEditing}
          handleSubmit={handleSubmit}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          charge={charge}
          amount={amount}
        />
      </div>

      <div>
        <ExpenseList
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleAllDelete={handleAllDelete}
          initialExpenses={expenses}
        />
      </div>

      <div>
        <p class="total">
          총 지출:
          <span>
            {expenses.reduce((acc, curr) => {
              return (acc += curr.amount);
            }, 0)}
            원
          </span>
        </p>
      </div>
    </main>
  );
}

export default App;
