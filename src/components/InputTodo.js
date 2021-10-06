import React,{Fragment,useState} from 'react'
import { schema } from './Validations';
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';




function InputTodo() {
    const [description, setDescription] =useState("");
   
  


   const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    const onSubmitForm = async(e) =>{
        //e.preventDefault();
        
        try {

            const body = {description};
              await fetch("https://polar-tor-57642.herokuapp.com/todos",{
            method:"POST",
            headers:{"Content-type": "application/json"},
            body:JSON.stringify(body)
            });
           window.location = "/" ;
        } catch (err) {
           console.error(err.message); 
        }
    }
    return (
        <Fragment>
            <h1 className="text-center mt-5">welcome to todo app</h1>
       
            <form className="d-flex mt-5" onSubmit={handleSubmit(onSubmitForm)}>
                <input 
                  type="text"
                  name="desc"
                  className="form-control " 
                  value={description} 
                  
                  {...register('desc')}
                  onChange={e => setDescription(e.target.value)}
                  />
              
                <button className=" btn btn-success">Add</button>
          
            </form>
            <p className="text-danger   "  >{errors.desc?.message}</p>
        </Fragment>
    )
}

export default InputTodo

