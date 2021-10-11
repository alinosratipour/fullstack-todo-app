import {createContext,useState,useEffect} from "react";

export const MyContext = createContext();

function ToDoContextProvider(props){

    const [todo, setTodo] = useState([]);

    // Delete Function
 const deleteTodo = async(id) =>{
     try {
          await fetch(`/todos/${id}`,{
             method: "DELETE"
         });
         
         setTodo(todo.filter(item=> item.todo_id !== id))
     } catch (err) {
         console.error(err.message);
     }
 }
 
 
     
     const listAlltodos = async() =>{
         try {    
            const response =  await fetch("/todos");
            const jsonData =  await response.json();
            setTodo(jsonData);
          } catch (err) {
             console.error(err.message);
          }   
        }

        useEffect( ()=>{
            listAlltodos()
        },[])

    const value ={
        todo,
        listAlltodos,
        deleteTodo
    }
return(
    <MyContext.Provider value={value}>
        {props.children}
    </MyContext.Provider>
)

}


export default ToDoContextProvider;