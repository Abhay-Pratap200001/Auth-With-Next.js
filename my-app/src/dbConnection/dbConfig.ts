import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!)
       const connection =  mongoose.connection
       connection.on('connected', ()=>{
       console.log("MONGODB-ATLAS-CONNECTED-SUCCESSFULLY");    
       })

       connection.on('error', (error)=>{
        console.log('Mongodb connection error: ', error);
        process.exit()
        
       })
    } catch (error) {
        console.log("Error while coonecting to db", error)
    }
}