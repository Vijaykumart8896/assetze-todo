const { json } = require("express");
const TodoListSchema = require("../Models/TodoList");

exports.CreateName = async (req, res) => {
    // console.log(req.body);
    let payload = await TodoListSchema.create(req.body);
    res.status(201).json({ success: true, message: "Successfully todolist created", payload })
}

exports.FetchAllNames = async (req, res) => {
    try {
        let payload = await TodoListSchema.find({});
        res.status(201).json({ success: true, message: "Successfully fetched all lists", payload })
    } catch (error) {
        console.log(error)
    }
}

exports.FetchOneName = async (req, res) => {
    let payload = await TodoListSchema.findOne({ _id: req.params.id });
    res.status(201).json({ success: true, message: "fecthed the single list", payload })
};

exports.EditName = async (req, res) => {
    let editedName = { ...req.body };
    let payload = await TodoListSchema.updateOne({ _id: req.params.id }, { $set: editedName })
    res.status(201).json({ success: true, message: "Edited the name", payload: editedName })
}

exports.DeleteName = async (req, res) => {
    let id = req.params.id
    let payload = await TodoListSchema.deleteOne({ id: id });
    res.status(201).json({ success: true, message: "Successfullu deleted the name", payload })
}