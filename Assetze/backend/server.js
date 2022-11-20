const express = require("express");
const cors=require('cors')
const { error, success, info } = require("consola");
const { PORT } = require("./config/index");
const connectDataBase = require("./config/db");
const todoRoute = require("./routes/todolist")
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use("/api", todoRoute)
let statServer = async () => {
    try {
        app.listen(PORT, err => {
            if (err) throw err;
            info(`Server is Listening PORT number is ${PORT}`)
        })
        connectDataBase()

    } catch (err) {
        error(err)

    }

}
statServer()