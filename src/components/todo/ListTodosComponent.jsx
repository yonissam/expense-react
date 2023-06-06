import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  retrieveAllTodosForCurrentMonthApi,
  deleteTodoApi,
} from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";

function ListTodosComponent() {
  const authContext = useAuth();
  const navigate = useNavigate();
  const { username, token } = authContext;

  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState(null);
  const [totalAmountY, setTotalAmountY] = useState(0);
  const [totalAmountN, setTotalAmountN] = useState(0);
  const [result, setResult] = useState(0);
  const [name, setName] = useState("");
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(15);

  useEffect(() => refreshTodos(), []);

  useEffect(() => {
    updateTotalAmount();
  }, [todos]);

  useEffect(() => {
    updateResult();
  }, [updateTotalAmount]);

  function refreshTodos() {
    retrieveAllTodosForCurrentMonthApi(username, token)
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => console.log(error));
  }

  function retrieveAllRecords() {
    navigate("/records");
  }

  function updateTotalAmount() {
    let totalY = 0;
    let totalN = 0;
    todos.forEach((todo) => {
      if (todo.owner === "Yonatan") {
        totalY += todo.amount;
      } else {
        totalN += todo.amount;
      }
    });
    setTotalAmountY(totalY);
    setTotalAmountN(totalN);
  }

  function updateResult() {
    if (totalAmountY > totalAmountN) {
      setResult((totalAmountY - totalAmountN) / 2);
      setName("Nebiyu");
    } else {
      setResult((totalAmountN - totalAmountY) / 2);
      setName("Yonatan");
    }
  }

  function deleteTodo(id) {
    deleteTodoApi(username, id, token)
      .then(() => {
        setMessage(`Delete of todo with id = ${id} successful`);
        refreshTodos();
      })
      .catch((error) => console.log(error));
  }

  function updateTodo(id) {
    navigate(`/todo/${id}`);
  }

  function addNewTodo() {
    navigate(`/todo/-1`);
  }

  function filterTodos() {
    return todos.filter((todo) => {
      return (
        todo.description.toLowerCase().includes(filter.toLowerCase()) ||
        todo.date.toString().includes(filter) ||
        todo.amount.toFixed(2).includes(filter) ||
        todo.owner.toLowerCase().includes(filter.toLowerCase())
      );
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

      <div>
        <input
          type="text"
          placeholder="Filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div>
        <table className="table text-white">
          <thead>
            <tr>
              <th>Description</th>
              <th>Category</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Owner</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {currentTodos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.description}</td>
                <td>{todo.category}</td>
                <td>{todo.date.toString()}</td>
                <td>{"$" + todo.amount.toFixed(2)}</td>
                <td>{todo.owner}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => updateTodo(todo.id)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3"></td>
              <td>Total Yonatan: {"$" + totalAmountY.toFixed(2)}</td>
              <td colSpan="3"></td>
            </tr>
            <tr>
              <td colSpan="3"></td>
              <td>Total Nebiyu: {"$" + totalAmountN.toFixed(2)}</td>
              <td colSpan="3"></td>
            </tr>
            <tr>
              <td colSpan="3"></td>
              <td>Result: {name + " owes " + "$" + result.toFixed(2)}</td>
              <td colSpan="3"></td>
            </tr>
          </tfoot>
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

      <div className="btn btn-success m-5" onClick={addNewTodo}>
        Add Expense
      </div>
      <div className="btn btn-warning m-5" onClick={retrieveAllRecords}>
        Records
      </div>
    </div>
  );
}

export default ListTodosComponent;
