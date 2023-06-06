import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { retrieveAllTodosForUsernameApi } from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";

function RecordsComponent() {
  const authContext = useAuth();
  const navigate = useNavigate();
  const { username, token } = authContext;

  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState(null);
  const [filterDescription, setFilterDescription] = useState("");
  const [filterOwner, setFilterOwner] = useState("");
  const [filterFromDate, setFilterFromDate] = useState("");
  const [filterToDate, setFilterToDate] = useState("");
  const [filterAmount, setFilterAmount] = useState("");
  const [filterAmountCondition, setFilterAmountCondition] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(20);

  useEffect(() => refreshTodos(), []);

  function refreshTodos() {
    retrieveAllTodosForUsernameApi(username, token)
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => console.log(error));
  }

  function filterTodos() {
    return todos.filter((todo) => {
      const descriptionMatch = todo.description
        .toLowerCase()
        .includes(filterDescription.toLowerCase());
      const ownerMatch = todo.owner
        .toLowerCase()
        .includes(filterOwner.toLowerCase());
      const dateMatch =
        (filterFromDate === "" || todo.date >= filterFromDate) &&
        (filterToDate === "" || todo.date <= filterToDate);
      const amountMatch =
        filterAmount === "" ||
        (filterAmountCondition === ">" && todo.amount > Number(filterAmount)) ||
        (filterAmountCondition === "<" && todo.amount < Number(filterAmount));

      return descriptionMatch && ownerMatch && dateMatch && amountMatch;
    });
  }

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = filterTodos().slice(indexOfFirstTodo, indexOfLastTodo);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filterTodos().length / todosPerPage); i++) {
    pageNumbers.push(i);
  }

  function paginate(pageNumber) {
    setCurrentPage(pageNumber);
  }

  return (
    <div className="container text-white">
      <h1>Expense Report</h1>
      {message && <div className="alert alert-warning">{message}</div>}

      <div className="filter-container">
        <div className="filter-item">
          <input
            type="text"
            placeholder="Filter by Description"
            value={filterDescription}
            onChange={(e) => setFilterDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Filter by Owner"
            value={filterOwner}
            onChange={(e) => setFilterOwner(e.target.value)}
          />
        </div>
        <div className="filter-item">
          <label>From Date:</label>
          <input
            type="date"
            value={filterFromDate}
            onChange={(e) => setFilterFromDate(e.target.value)}
          />
          <label>To Date:</label>
          <input
            type="date"
            value={filterToDate}
            onChange={(e) => setFilterToDate(e.target.value)}
          />
        </div>
        <div className="filter-item">
          <input
            type="text"
            placeholder="Filter by Amount"
            value={filterAmount}
            onChange={(e) => setFilterAmount(e.target.value)}
          />
          <select
            value={filterAmountCondition}
            onChange={(e) => setFilterAmountCondition(e.target.value)}
          >
            <option value="">Filter Condition</option>
            <option value=">">Greater Than</option>
            <option value="<">Less Than</option>
          </select>
        </div>
      </div>
      <div>
        <table className="table text-white">
          <thead>
            <tr>
              <th>Description</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>
            {currentTodos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.description}</td>
                <td>{todo.date.toString()}</td>
                <td>{"$" + todo.amount.toFixed(2)}</td>
                <td>{todo.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={number === currentPage ? "active" : ""}
            onClick={() => paginate(number)}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
}

export default RecordsComponent;
