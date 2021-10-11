import React,{Fragment,useContext} from 'react'
import EditeTodo from './EditeTodo';
import { MyContext } from '../context/MyContext';
function ListTodos() {

const {todo,deleteTodo} = useContext(MyContext);
  
    return (
        <Fragment>
                
  <table className="table mt-5 text-center">
    <thead>
      <tr>
        <th>Description</th>
        <th>Edite</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      
      {todo.map(item =>(
       
        <tr key={item.todo_id}>
        <td>{item.description}</td>
        <td>
         
          <EditeTodo todo = {item}/>
        
        </td>
        <td><button className="btn btn-danger"
         onClick= {() => deleteTodo(item.todo_id)}
        
        >Delete</button></td>
      </tr>
      
      ))}
       
    </tbody>
  </table>
        </Fragment>
    )
}

export default ListTodos
