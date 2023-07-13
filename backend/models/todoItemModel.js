import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ToDoSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    complete: {
        type: String,
        default: false,
    },
    timestamp: {
        type: String,
        default: Date.now(),
    },
});

const Todo = mongoose.model("ToDoItem", ToDoSchema);

export default Todo;