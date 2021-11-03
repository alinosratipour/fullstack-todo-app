const express = require("express");
const router = express.Router();
const pool = require("../../db");

//update All toDos
router.put("/todos/:id", async (req, res) => {
   try{
     const {id} = req.params; 
     const {description} = req.body;  
     const updateTodo = await pool.query("UPDATE  todo SET description = $1 WHERE todo_id = $2 ",
     [description ,id]
     );
     res.json("Todo was updated");
    }catch(err){
        console.error(err.message);
    }
});

module.exports = router;
