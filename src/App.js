import { useEffect, useState } from "react";
import data from "./config.js";
import "./App.css";

function App() {
  const [listData, setListData] = useState(data);
  const [list, setList] = useState(data);
  const [filtertask, setfiltertask] = useState("All");
  useEffect(() => {
    handleFilterTask();
  }, [filtertask]);

  const handleDeleteItem = (id) => {
    const deletedItem = listData.filter((item) => item.id !== id);
    setListData(deletedItem);
  };
  const [title, setTitle] = useState("new Task");
  const options = [
    {
      label: "All",
      value: "All",
    },
    {
      label: "Pending",
      value: "Pending",
    },
    {
      label: "Completed",
      value: "Completed",
    },
  ];

  const onsubmit = () => {
    setListData([
      ...listData,
      { id: listData.length + 1, title: title, status: "Pending" },
    ]);
  };
  const handlechangeStatus = (item) => {
    item.status = "Completed";
    const value = listData.indexOf(item);
    listData[value] = item;
    const UpdateList = listData;

    setListData([...UpdateList]);
  };
  const handleFilterTask = () => {
    if (filtertask == "Completed") {
      let task = list.filter((item) => item.status == filtertask);
      setListData(task);
    }
    if (filtertask == "Pending") {
      let task = list.filter((item) => item.status == filtertask);
      setListData(task);
    }
    if (filtertask == "All") {
      setListData(list);
    }
  };

  return (
    <div>
      <div className="formdata">
        <label>Add Task :</label>{" "}
        <input type="text" onChange={(e) => setTitle(e.target.value)} />{" "}
        <button onClick={() => onsubmit()} class="btn btn-primary me-5 ms-2">
          Submit
        </button>
        <label>Filter : </label>
        <select
          className="mx-2"
          onChange={(e) => setfiltertask(e.target.value)}
          style={{ width: "200px", heigth: "30px" }}
        >
          {options.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      <div className="container">
        <table class="table my-5">
          <thead class="table-dark">
            <tr>
              <th scope="col">Title</th>
              <th scope="col"></th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody className="borders">
            {listData.map((item) => (
              <tr>
                <td class="fs-6">{item.title}</td>
                <td style={{ width: "150px" }}>
                  <span
                    className={
                      item.status == "Completed" ? "completed" : "pending"
                    }
                  >
                    {item.status}
                  </span>
                </td>
                <td style={{ width: "300px" }}>
                  <button
                    className=" btn btn-danger mx-2"
                    onClick={() => {
                      handleDeleteItem(item.id);
                    }}
                  >
                    Delete
                  </button>
                  {item.status == "Pending" && (
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        handlechangeStatus(item);
                      }}
                    >
                      Completed
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
