import "dotenv/config";
import  express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import pool from "./config/db.js";
import authRouter  from "./routes/auth.routes.js";
import morgan from "morgan";
import mediaRouter from "./routes/media.routes.js";
import {isAuth} from "./middleware/isAuth.js";

const app = express();

// in built middleware
// app.use = middlware-- andr wla sara middlea
app.use(express.json());
app.use(cookieParser())
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
         credentials: true,
        
    }),
);

app.use (morgan("dev"));

app.get("/",(req, res)=>{
    res.send("Hello from server");
});

// all routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/media", isAuth, mediaRouter)


async function startServer() {
    

   if(!process.env.DATABASE_URL){   
    throw new Error("DATABASE_URL is missing.Add it to your .env file");
   }

   if(!process.env.JWT_SECRET){
    throw new Error("JWT_SECRET is missing. Add it to your .env file");
   }
 
   //fails early if  is postgresql is not reachable
   await pool.query("SELECT 1");
   console.log("PostgreSQL connected successfully!");
   console.log(
    `📦Database: ${new URL(process.env.DATABASE_URL).pathname.slice(1)}`,
   );
   

   const PORT = process.env.PORT || 8000;
   app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
   });
}

 startServer().catch((error) =>{
    console.error("could not start the server:" , error.message);
    process.exit(1);
 })

 export default app;
