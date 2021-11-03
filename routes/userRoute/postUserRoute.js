const express = require("express");
const router = express.Router();
const pool = require("../../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../../utils/jwtGenerator");
//update All toDos
router.post("/signup", async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    
    //Encrypt password
    const salt = await bcrypt.genSalt(10);
    bcryptpassword = await bcrypt.hash(password, salt);

    // Validate email does not exist 
    const query = "SELECT * FROM users WHERE email = $1";
    const checkuser = await pool.query(
      query,[email]
    );

if (checkuser.rowCount) {
   res.status(401).json({ errors: [{ msg: "User already Exist" }] });
}

  const newuser = await pool.query(
    "INSERT INTO users (firstname, lastname, email,password) VALUES($1,$2,$3,$4) RETURNING * ",
    [firstname, lastname, email, bcryptpassword]
  );

 //generating our jwt token 
 const token = jwtGenerator(newuser.rows[0].id);
   res.json({token})
  //res.json({ "success": "New graduate is created", "graduate": newuser.rows[0] })
  
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
