import express from "express";
import type { Request , Response , NextFunction  } from "express";
import cors from "cors"
const app = express();

app.use(express.json())

// const allowedOrigins = [/^https?:\/\/localhost(:\d+)?$/, /^https?:\/\/127\.0\.0\.1(:\d+)?$/];

// app.use(cors({
//     origin: function (origin, callback) {
//         // Allow requests with no origin (like mobile apps or curl requests)
//         if (!origin) return callback(null, true);
        
//         // Check if the origin matches any of your regex patterns
//         const isAllowed = allowedOrigins.some(regex => regex.test(origin));
        
//         if (isAllowed) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     credentials: true
// }));

app.use(express.urlencoded({ extended: true }));

app.use('/ping', (req:Request , res:Response , next:NextFunction) =>{res.status(200).json({message:"pong"})})

// accumalted errors
app.use((error:Error,req:Request,res:Response,next:NextFunction)=>{
    res.status(500).json({message:"Internal Server Error"})
})
export default app