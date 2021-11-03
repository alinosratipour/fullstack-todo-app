const express = require("express");
const router = express.Router();
const authorization = require("../middleware/authorization");

router.get("/is-verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(401).send("server error");
  }
});

module.exports = router;
