import mongoose, {Schema} from "mongoose";

const task_Santillan = new Schema ({
    user: String,
    title: String,
    description: String,
    dueDate: Date,

})

const taskSchema = mongoose.model("Task", task_Santillan);

export default taskSchema;