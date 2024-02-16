import express from "express"
import cors from 'cors'
import router from "./routes";



const app: express.Application=express()
app.use(cors())
app.use(express.json());


const PORT: number=406;

app.get('/',async (req,res)=>{
    res.send('relax backend is up')
})
app.use('/api',router)
app.listen(PORT,()=>{
    console.log(`server is up on port ${PORT}`);
    
})