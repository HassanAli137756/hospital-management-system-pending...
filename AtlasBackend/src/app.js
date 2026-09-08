import express from 'express'
import 'dotenv/config.js'
import cors from 'cors'

const app = express()

app.use(cors(
{
    origin: "http://localhost:5173/",
    credentials: true
}
))


app.use(express.urlencoded())
app.use(express.json())
app.use(express.static())






app.get('/greeting', (req, res) =>
{
    res.send("Hello Hassan Ali")
    
})

export {app}