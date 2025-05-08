import { useCallback, useMemo, useState } from "react";
import "./App.css";
import TaskList from "./taskList/TaskList";
import AddTask from "./taskList/AddTask";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Unit Testing",
      description: "Write unit tests for the login module.",
      status: "not completed",
    },
    {
      id: 2,
      title: "Integration Testing",
      description:
        "Test the integration between the user service and the payment gateway.",
      status: "not completed",
    },
    {
      id: 3,
      title: "Regression Testing",
      description: "Perform regression testing after the recent deployment.",
      status: "not completed",
    },
    {
      id: 4,
      title: "Performance Testing",
      description: "Measure the application's response time under load.",
      status: "not completed",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [theme, setTheme] = useState("light");
  const handleSearch = (e) => {
    // console.log(e.target.value);
    setSearchTerm(e.target.value);
  };
  const toggleStatus = useCallback((id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id && task.status === "not completed"
          ? { ...task, status: "completed" }
          : { ...task, status: "not completed" }
      )
    );
  }, []);

  const filterTask = useCallback(
    (searchTerm) => {
      return tasks.filter((task) => {
        return task.title.toLowerCase().includes(searchTerm.toLowerCase());
      });
    },
    [tasks]
  );

  const filteredTask = useMemo(() => {
    return filterTask(searchTerm);
  }, [filterTask, searchTerm]);

  const properties =
    theme === "light"
      ? {
          backgroundColor: "#f5f5f5",
          color: "#333",
        }
      : {
          backgroundColor: "#333",
          color: "#f5f5f5",
        };
  const addTask = (info) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: prevTasks.length + 1,
        title: info.title,
        description: info.description,
        status: "not completed",
      },
    ]);
  };

  const deleteHandler = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };
  const resetSearch = () => {
    setSearchTerm("");
  };

  const changeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div style={{ ...properties, position: "relative" }} className="p-3">
      <nav id="navbar-example2" className="navbar  px-3 mb-3">
        <a
          style={{ color: properties.color }}
          className="navbar-brand logo"
          href="#"
        >
          Todo List
        </a>
        <button
          type="button"
          className="btn"
          data-bs-toggle="button"
          style={{ position: "absolute", top: 0, right: 0 }}
          onClick={changeTheme}
        >
          <span
            className="material-symbols-outlined"
            style={theme !== "light" ? { color: "white" } : {}}
          >
            {theme === "light" ? "dark_mode" : "light_mode"}
          </span>
        </button>
      </nav>

      <AddTask onAdd={addTask} theme={theme} />
      <div>
        <div className="input-group mb-3 mt-3">
          <input
            type="text"
            name="search"
            onChange={handleSearch}
            value={searchTerm}
            placeholder="Search Task"
            className={
              theme === "light"
                ? "form-control bg-light light-input"
                : "form-control bg-dark dark-input dark-placeholder"
            }
            aria-describedby="button-addon2"
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            onClick={resetSearch}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
      </div>
      <TaskList
        tasks={filteredTask}
        onToggle={toggleStatus}
        onDelete={deleteHandler}
        theme={theme}
      />
    </div>
  );
}

export default App;
