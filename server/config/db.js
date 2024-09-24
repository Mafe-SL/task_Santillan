import mongoose from "mongoose";

export const mongoDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://Admin:drupi2003@cluster0.dga6yql.mongodb.net/task_Santillan");
        console.log("Conexión exitosa");
        
    } catch (error) {
        console.log("Error en la conexión");
        
    }

}