const express = require("express");
const { CreateName, FetchAllNames, FetchOneName, EditName, DeleteName } = require("../controllers/TodoListController");

const router = express.Router()

router.post("/create-todo", CreateName);
router.get("/fetch-all", FetchAllNames);
router.get("/:id", FetchOneName);
router.put("/:id", EditName);
router.delete("/:id", DeleteName);


module.exports = router;