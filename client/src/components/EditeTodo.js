import React,{Fragment,useState} from 'react'

function EditeTodo({todo}) {
const [description , setDescription] = useState(todo.description);


const isEnabled = description.length > 0;

// updsating description
const updateDescription = async (e) =>{
    e.preventDefault();
try {
    const body = {description};
   await fetch(`http://localhost:5000/todos/${todo.todo_id}`,{
       method: "PUT",
       headers: {"Content-Type": "application/json"},
       body: JSON.stringify(body)
   });
   window.location = "/";
} catch (err) {
    console.error(err.message);
}
}


    return (
        <Fragment>
          
<button type="button" className="btn btn-warning btn-md" 
data-toggle="modal" 
data-target={`#id${todo.todo_id}`}>Edite</button>


<div id={`id${todo.todo_id}`}
 className="modal fade" 
 role="dialog"
 onClick={e=>setDescription(todo.description)}
 >
  <div className="modal-dialog">

    
    <div className="modal-content">
      <div className="modal-header">
       
        <h4 className="modal-title">Edite ToDo</h4>
         <button type="button" className="close" data-dismiss="modal">&times;</button>
      </div>
      <div className="modal-body">
        <input type="text"
         className="form-control" 
         value={description}
         name="desc"
         onChange={e =>setDescription(e.target.value)} 
         
         
         />
      </div>
      <div className="modal-footer">
        <button type="button"
         className="btn btn-warning" 
         data-dismiss="modal"
         disabled={!isEnabled}
         onClick= {e => updateDescription(e)}
         >
             Edite
             </button>
        <button type="button"
         className="btn btn-danger" 
         data-dismiss="modal"
         onClick={e=>setDescription(todo.description)}
         >Close</button>
      </div>
    </div>

  </div>
</div>
        </Fragment>
    )
}

export default EditeTodo
