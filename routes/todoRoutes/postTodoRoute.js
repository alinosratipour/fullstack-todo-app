const express = require("express");
const router = express.Router();
const pool = require("../../db");

//update All toDos
router.post("/todos", async (req, res) => {
   try {
     const { description } = req.body;
     const newtodo = await pool.query(
       "INSERT INTO todo (description) VALUES($1) RETURNING * ",
       [description]
     );
     res.json(newtodo.rows[0]);
   } catch (err) {
     console.error(err.message);
   }
});

module.exports = router;
