const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");

//middelware
app.use(cors());
app.use(express.json()); // allows access to req.body 

//app.use(express.static("./client/build"))


if(process.env.NODE_ENV === "production"){
    // serve static content
    // npm run build
    app.use(express.static(path.join(__dirname, "client/build")));
}


//Create a todos

app.post("/todos", async(req,res) =>{

    try{

        const {description } = req.body;
        const newtodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING * ",
        [description]
        );
        res.json(newtodo.rows[0]);
    }catch(err){
     console.error(err.message);
    }


})

// get all todos

app.get("/todos" , async(req,res) =>{

try{

    const listtodos = await pool.query("SELECT * FROM todo");
    res.json(listtodos.rows);

}catch(err){
    console.error(err.message);
}

});

// get a todo
app.get("/todos/:id", async(req, res) => {
const {id} = req.params;
try{
const findtodo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",[id]);
    res.json(findtodo.rows[0]);
}catch(err){
    console.error(err.message);
}

});
// update a todo
app.put("/todos/:id", async (req, res)=>{

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

// delete a todo
app.delete("/todos/:id" , async (req, res)=>{

    try{ 
      const { id } = req.params;
      const deleteTodo = pool.query("DELETE FROM todo WHERE todo_id = $1",
       [id]
       );
      //res.json("Todo Deleted");
      res.json({ success: "Graduate is deleted" });
    } catch(err){
      console.error(err.message);
    }
});


app.get("*", (req , res)=>{
    res.sendFile(path.join(__dirname, "client/build/index.html"));
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
    console.log(`server running at port ${PORT}`);
})