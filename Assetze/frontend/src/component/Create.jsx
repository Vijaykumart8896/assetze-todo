import React, { useState, useEffect } from "react";
import axios from "axios";
import "./todo.css";
const Create = () => {
  let [username, setUsername] = useState("");
  let [alldata, setAlldata] = useState([]);
  let [added, setAdded] = useState(false);
  let [isEdit, setIsedit] = useState(false);
  let [editid, setEditid] = useState([]);
  let [addOredit, setAddorEdit] = useState(true);
  useEffect(() => {
    let fetch = async () => {
      let { data } = await axios.get("http://localhost:5000/api/fetch-all");
      console.log(data);
      setAlldata(data.payload);
    };
    fetch();
  }, [added]);
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let payload = {
        name: username,
      };
      if (!isEdit && username!='') {
        console.log(payload);
        await axios.post("http://localhost:5000/api/create-todo", payload);
        setAdded(!added);
        setUsername("");
      } else {
        let id = editid._id;
        await axios.put(`http://localhost:5000/api/${id}`, payload);
        setAdded(!added);
        setUsername("");
        setAddorEdit(!addOredit);
      }
    } catch (error) {
      console.log(error);
    }
  };
  let editUser = async (data) => {
    setEditid(data);
    setUsername(data.name);
    setIsedit(!isEdit);
    setAddorEdit(!addOredit);
  };
  let deleteUser = async (data) => {
    let id = data.id;
    await axios.delete(`http://localhost:5000/api/${id}`);
    setAdded(!added);
  };
  return (
    <>
      <div id="TodoSection">
        <h1>ToDo List</h1>
        <form action="" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="username"
              id=""
              value={username}
              placeholder="enter your name"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <button>{addOredit ? "addUser" : "UpdateUser"}</button>
          </div>
        </form>

        <div id="allUserSection">
          {alldata?.map((x) => {
            return (
              <>
                <div id="userDiv">
                  <p>{x.name}</p>
                  <div id="editOrdelete">
                    {" "}
                    <button onClick={() => editUser(x)}>edit</button>
                    <button onClick={() => deleteUser(x)}>delete</button>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Create;
