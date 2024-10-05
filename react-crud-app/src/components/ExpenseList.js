import React from "react";
import ExpenseItem from "./ExpenseItem";
import "./ExpenseList.css";

const ExpenseList = ({
  initialExpenses,
  handleEdit,
  handleDelete,
  handleAllDelete,
}) => {
  return (
    <>
      <ul className="list">
        {initialExpenses.map(expense => {
          return (
            <ExpenseItem
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              expense={expense}
              key={expense.id}
            />
          );
        })}
      </ul>
      <button className="btn" onClick={handleAllDelete}>
        목록 지우기
      </button>
    </>
  );
};

export default ExpenseList;
