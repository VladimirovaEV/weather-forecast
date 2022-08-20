const express = require("express");
const router = express.Router({mergeParams: true});

router.use("/auth", require("./auth.routes"));
router.use("/user", require("./user.routes"));
router.use("/favorite", require("./favorite.routes"));

module.exports = router;