const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const todos = require("./routes/todoRoutes/todosRoute.js");
const updateTodos = require("./routes/todoRoutes/updateToDos.js");
const postTodo = require("./routes/todoRoutes/postTodoRoute.js");
const postUsers = require("./routes/userRoute/postUserRoute.js");
const loginUser = require("./routes/userRoute/userLoginRoute.js");
const dashboard = require("./routes/dashboard/dashboardRoute.js");
const verifyAuth = require("./routes/verifyjwt");
//middelware
app.use(cors());
app.use(express.json()); // allows access to req.body 

//app.use(express.static("./client/build"))

app.use("/", todos);
app.use("/", updateTodos);
app.use("/", postTodo);
app.use("/", postUsers);
app.use("/", loginUser);
///app.use("/", verifyAuth);
app.use("/", dashboard);

if(process.env.NODE_ENV === "production"){
    // serve static content
    // npm run build
    app.use(express.static(path.join(__dirname, "client/build")));
}

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