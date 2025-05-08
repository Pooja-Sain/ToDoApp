import { useState } from "react";
import "./AddTask.css";

const AddTask = ({ onAdd, theme }) => {
  const [task, getTask] = useState({
    title: "",
    description: "",
  });
  var titleHandler = (event) => {
    getTask((prevState) => {
      return {
        title: event.target.value,
        description: prevState.description,
      };
    });
  };

  var descHandler = (event) => {
    getTask((prevState) => {
      return {
        title: prevState.title,
        description: event.target.value,
      };
    });
  };

  var submitHandler = (e) => {
    e.preventDefault();
    onAdd(task);
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <div className="mb-3">
            <input
              onChange={titleHandler}
              name="title"
              placeholder="Title"
              type="text"
              className={
                theme === "light"
                  ? "form-control bg-light text-dark"
                  : "form-control bg-dark text-light dark-placeholder"
              }
              id="exampleFormControlInput1"
            />
          </div>
          <div className="mb-3">
            <textarea
              onChange={descHandler}
              name="description"
              placeholder="Add Description"
              className={
                theme === "light"
                  ? "form-control bg-light text-dark"
                  : "form-control bg-dark text-light dark-placeholder"
              }
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
        </div>
        <div class="d-grid gap-2">
          <button className="btn btn-primary" type="submit">
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddTask;
