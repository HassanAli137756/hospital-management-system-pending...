import 'dotenv/config.js'

import { app } from "./app.js";
import { connectDB } from "./db/connnectDB.js";

connectDB()
.then((res) =>
{
    app.listen(process.env.PORT || 4000, () =>
    {
        console.log("DB has connected Successfully at port", process.env.PORT);
        
    }
    )
})
.catch((err) =>
{
    console.log("failed to connect DB", err);
    
})