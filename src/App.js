import "./App.css";
import TodoApp from "./components/todo/TodoApp";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <Toaster />
      <TodoApp />
    </div>
  );
}

export default App;
