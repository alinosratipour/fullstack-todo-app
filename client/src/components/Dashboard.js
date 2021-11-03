import React, {Fragment,useEffect,useState} from 'react'
import InputTodo from "./InputTodo";
import ListTodos from "./ListTodos";
function Dashboard() {
  const [name, setName] = useState("");

  async function getName() {
    try {
      const response = await fetch("/dashboard", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
    //console.log("this is some id",parseRes);
      setName(parseRes.firstname);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getName();
  },[]);

  return (
    <Fragment>
      <div className="container">
        <h1>dashboard</h1>
        <h2>Welcome {name}</h2>
          <InputTodo />
          <ListTodos />

      </div>
    </Fragment>
  );
}

export default Dashboard
