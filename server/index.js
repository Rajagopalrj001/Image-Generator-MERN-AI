import cors from "cors" ;
import express from "express" ;
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import PostRouter from "./routes/Posts.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({extended:true}));


// Error Handler
app.use((err, req, res, next)=> {
  const status = err.status || 500;
  const message = err.message || "something went wrong!"
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.use("/api/post", PostRouter)

//Default get
app.get("/",async(req, res) => {
  res.status(200).json({
    message: "Welcome to the AI Server",
  })
});

//connection of mongodb server
const connectDB = () =>{
  mongoose.set("strictQuery",true);
  mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected!"))
  .catch((err)=> {
    console.error(err)
    console.error("Failed to connect")
  });
}


//function to start the server
const startServer = async()=>{
  try{
    connectDB();
    app.listen(9000,console.log("Server started on port 9000"))
  } catch(error){
    console.error(error);
  }
};

startServer();