const { createRecord, getRecords, deleteRecord, login } = require("../Controller/UserController")
const { protectAdmin } = require("../Middlewares/Authorization")

const UserRouter = require("express").Router()

UserRouter.post("/signup", createRecord)
UserRouter.get("/all-users",protectAdmin, getRecords)
UserRouter.delete("/delete-user/:id", deleteRecord)


UserRouter.post("/log-in", login)


module.exports = UserRouter