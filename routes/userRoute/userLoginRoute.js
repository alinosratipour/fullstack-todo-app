const express = require("express");
const router = express.Router();
const pool = require("../../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../../utils/jwtGenerator");
const authorization = require("../../middleware/authorization");
// Login Route
router.post("/login", async (req, res) => {
  try {
    
    // Destracture the req.body
    const {email , password} = req.body;

    // Check if user does not exist
    const userPass = await pool.query("SELECT * FROM users WHERE email = $1", [email])
    // check to see if password is correct
    if(userPass.rows.length === 0){
      return  res.status(401).json("user does not exist")
    }

    // if everything is ok then give user jwt 

    const validPassword =  await bcrypt.compare(password, userPass.rows[0].password)
      if(!validPassword){
        return res.status(401).json("Password or email is Wrong")
      }

      const token = jwtGenerator(userPass.rows[0].id);
      res.json({token});
  } catch (err) {
    console.error(err.message);
     res.status(500).send("server error");
  }
});


module.exports = router;