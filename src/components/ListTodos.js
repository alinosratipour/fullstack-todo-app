import React,{Fragment,useState, useEffect} from 'react'
import EditeTodo from './EditeTodo';

function ListTodos() {
    const [list, setList] = useState([]);


   // Delete Function
const deleteTodo = async(id) =>{
    try {
         await fetch(`http://localhost:5000/todos/${id}`,{
            method: "DELETE"
        });
        
        setList(list.filter(item=> item.todo_id !== id))
    } catch (err) {
        console.error(err.message);
    }
}


    
    const listAlltodos = async() =>{
        try {    
           const response =  await fetch("http://localhost:5000/todos");
           const jsonData =  await response.json();
           setList(jsonData);
         } catch (err) {
            console.error(err.message);
         }   
       }
    
    useEffect( ()=>{
        listAlltodos()
    },[])
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
      {/* <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr>
      <tr> */}
      {list.map(item =>(
       
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
