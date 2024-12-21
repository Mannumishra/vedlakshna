const { createRecord, getRecords, deleteRecord, login, getSingleRecords, logout } = require("../Controller/UserController")
const { protectAdmin } = require("../Middlewares/Authorization")

const UserRouter = require("express").Router()

UserRouter.post("/signup", createRecord)
UserRouter.get("/all-users",protectAdmin, getRecords)
UserRouter.get("/get-user/:id",getSingleRecords)
UserRouter.delete("/delete-user/:id", deleteRecord)


UserRouter.post("/log-in", login)
UserRouter.post("/log-out", logout)


module.exports = UserRouter