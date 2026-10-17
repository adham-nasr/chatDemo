import { connectDb } from "./db.js"
import { config } from "./config.js"
import app from "./app.js"
await connectDb()
app.listen(config.port,()=>{
    console.log("server is running on port",config.port)
})
