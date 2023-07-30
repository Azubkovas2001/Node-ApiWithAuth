const express = require("express");
const router = express.Router();

const adminKey = "1234";

router.use((req, res, next) => {
  const reqKey = req.headers["admin-key"];

  if (reqKey === adminKey) {
    next();
    return;
  }

  res.status(401).send("Unauthorized");
});

module.exports = router;
