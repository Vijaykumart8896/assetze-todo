const { Schema, model } = require("mongoose");

let TodoListSchema = new Schema({
    name: {
        type: String,
    }
}, { timeseries: true });

module.exports = model("TodoList", TodoListSchema)