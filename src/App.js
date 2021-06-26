import React from 'react';
import './style.css';

export default function App() {
  const [todos, setTodos] = React.useState([
    { id: 1, text: 'wash Your Dishes', done: false },
    { id: 2, text: 'Do Laundary', done: false },
    { id: 3, text: 'takes Showers', done: false }
  ]);
  return (
    <div className="container">
      <h1 className="text-center text-secondary">Todolist</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Todo List</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <TodoList todos={todos} setTodos={setTodos} />
            </td>
          </tr>
        </tbody>
      </table>
      <p className="text-danger">if a user double clicks a list item, then status updated as not done</p> <br/><br/>
      <AddTodo setTodos={setTodos} />
    </div>
  );
}
function TodoList({ todos, setTodos }) {
  function handleToggleTodo(p) {
    const updatedTodos = todos.map(t =>
      t.id === p.id
        ? {
            ...t,
            done: !t.done
          }
        : t
    );

    setTodos(updatedTodos);
  }
  if (!todos.length) {
    return <p>No todos left!</p>;
  }

  return (
    <>
      <ul>
        {todos.map(p => (
          <li
            onDoubleClick={() => handleToggleTodo(p)}
            style={{ textDecoration: p.done ? 'line-through' : '' }}
            key={p.id}
          >
            {p.text}
            <DeleteTodo p={p} setTodos={setTodos} />
          </li>
        ))}
      </ul>
    </>
  );
}
function DeleteTodo({ p, setTodos }) {
  function handleDeleteTodo() {
    const conf = window.confirm('Do you want to delete this ??');
    if (conf) {
      setTodos(prevTodos => {
        return prevTodos.filter(t => t.id !== p.id);
      });
    }
  }
  return (
    <button onClick={handleDeleteTodo} className="btn btn-primary ">
      Delete
    </button>
  );
}

function AddTodo({ setTodos }) {
  const inputRef = React.useRef();
  function handleAddTodo(e) {
    e.preventDefault();
    const text = e.target.elements.addTodo.value;

    const todo = {
      id: Math.random(),
      text,
      done: false
    };
    setTodos(prevTodos => {
      return prevTodos.concat(todo);
    });
    inputRef.current.value = '';
  }

  return (
    <>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          name="addTodo"
          placeholder="add todo"
          ref={inputRef}
        />
        <br />
        <button className="btn btn-dark" type="submit">
          Add
        </button>
      </form>
    </>
  );
}
