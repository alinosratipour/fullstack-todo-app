import React,{Fragment}  from 'react';
import InputTodo from './components/InputTodo';
import ListTodos from './components/ListTodos';
import ToDoContextProvider from './context/MyContext'

function App() {
  return (
    <ToDoContextProvider>
       <Fragment >
      <div className="container">
        <InputTodo/>
        <ListTodos/>
       
      </div>
     
    </Fragment>
    </ToDoContextProvider>
   
  );
}

export default App;
