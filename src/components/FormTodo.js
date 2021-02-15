import React from "react";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import moment from "moment";

export const FormTodo = ({ addTodo, setStatus }) => {
  const [value, setValue] = React.useState("");

  const [errors, setErrors] = React.useState({
    value: "",
  });

  const [isLoadingSubmit, setIsLoadingSubmit] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoadingSubmit(true);

    if (!value) {
      const setErrorValue = "Value cannot be blank.";
      setErrors({ value: setErrorValue });
      return;
    } else {
      setErrors({ value: "" });
    }

    setTimeout(() => {
      setIsLoadingSubmit(false);

      addTodo({
        text: value,
        isDone: false,
        createdAt: moment().format("DD-MM-YYYY H:mm:ss"),
      });
      setValue("");
    }, 1000);
  };

  const handleStatus = (e) => {
    switch (e.target.value) {
      case "uncompleted":
        setStatus("uncompleted");
        break;
      case "completed":
        setStatus("completed");
        break;

      default:
        setStatus("all");
        break;
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Col xs={"auto"}>
            <Form.Group>
              <Form.Control
                type="text"
                className={`input ${errors.value ? "is-invalid" : ""}`}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={errors.value ? errors.value : "Add new todo"}
              />
            </Form.Group>
          </Col>
          <Col xs={"auto"}>
            <Button variant="dark" type="submit">
              {isLoadingSubmit && !errors.value ? (
                <Spinner animation="grow" size="sm" />
              ) : (
                <i className="text-white fa fa-plus"></i>
              )}
            </Button>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Control onChange={handleStatus} as="select">
                <option value="" selected>
                  All
                </option>
                <option value="completed">Completed</option>
                <option value="uncompleted">Uncompleted</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Form.Row>
      </Form>
    </div>
  );
};
