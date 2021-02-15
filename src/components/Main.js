import React from "react";
import { Card, Image, Spinner } from "react-bootstrap";
import { Todo } from "./Todo";
import { FormTodo } from "./FormTodo";
import logo from "./../img/logo192.png";

export const Main = () => {
  const [todos, setTodos] = React.useState([]);

  const [filterTodos, setFilterTodos] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(true);

  const [status, setStatus] = React.useState("all");

  React.useEffect(() => {
    setIsLoading(false);
    filterHandler();
  }, [todos, status]);

  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilterTodos(todos.filter((todo) => todo.isDone === true));
        break;

      case "uncompleted":
        setFilterTodos(todos.filter((todo) => todo.isDone === false));
        break;

      default:
        setFilterTodos(todos);
        break;
    }
  };

  const addTodo = (text) => {
    const newTodos = [...todos, text];
    setTodos(newTodos);
  };

  const markTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isDone = !newTodos[index].isDone;
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-center">
        <Image className="App-logo" src={logo} />
      </div>
      <h1 className="text-center m-4 text-white">Mizar's Todo</h1>
      <FormTodo addTodo={addTodo} setStatus={setStatus} />
      <div>
        {!todos.length ? (
          <div className="d-flex justify-content-center">
            <p className="text-white">Create your first todo! </p>
          </div>
        ) : (
          ""
        )}
        {isLoading ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" />
          </div>
        ) : (
          filterTodos
            .map((todo, index) => (
              <Card
                key={index}
                className={"mt-3"}
                style={{
                  boxShadow: "8px 16px 22px -12px rgba(39,37,37,0.57)",
                }}
              >
                <Card.Body>
                  <Todo
                    index={index}
                    todo={todo}
                    markTodo={markTodo}
                    removeTodo={removeTodo}
                  />
                </Card.Body>
              </Card>
            ))
            .sort((a, b) => (b.createdAt - a.createdAt ? 1 : -1))
        )}
      </div>
    </div>
  );
};
