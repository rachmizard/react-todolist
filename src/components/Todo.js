import React from "react";
import { Button } from "react-bootstrap";

export const Todo = ({ todo, index, markTodo, removeTodo }) => {
  return (
    <div className="todo">
      <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>
        {todo.text}
        <p className="text-muted">{todo.createdAt}</p>
      </span>
      <div>
        <Button className="mr-2" variant="outline-success" onClick={() => markTodo(index)}>
          {!todo.isDone ? (
            <i className="fa fa-check"></i>
          ) : (
            <i className="fa fa-undo"></i>
          )}
        </Button>
        <Button variant="outline-danger" onClick={() => removeTodo(index)}>
          <i className="fa fa-trash"></i>
        </Button>
      </div>
    </div>
  );
};
