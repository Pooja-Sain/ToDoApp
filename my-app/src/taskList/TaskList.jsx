import React from "react";

const TaskList = React.memo(({ tasks, onToggle, onDelete, theme }) => {
  return (
    <table
      className={
        theme === "light"
          ? "table table-bordered table-light table-striped"
          : "table table-bordered table-dark table-striped"
      }
    >
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Current Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.id}</td>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>
              <span
                className={`badge rounded-pill ${
                  task.status === "completed" ? "bg-success" : "bg-warning"
                }`}
              >
                {task.status}
              </span>
            </td>
            <td>
              <button
                type="button"
                className="btn btn-success me-2"
                onClick={() => onToggle(task.id)}
              >
                {task.status === "completed"
                  ? "mark not completed"
                  : "mark completed"}
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => onDelete(task.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});

export default TaskList;
