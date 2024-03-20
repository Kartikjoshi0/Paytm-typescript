import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "./config";
import middleware from "../middlewares/middleware";




const user=Router()
const prisma = new PrismaClient()


user.post('/signup',async (req,res)=>{
    const {username,password,firstName,lastName}=req.body

    try {
        const result= await prisma.user.create({
            data:{
                username,
                password,
                firstName,
                lastName
            }
        })

        const balance =Math.floor(Math.random() *1000)
        await prisma.account.create({
            data:{
                userId:result.id,
                balance: balance
            }
        })

        if(result){
            const token =jwt.sign({userId: result.id},JWT_SECRET)
            return res.json({msg: "User Created Successfully", token: token, balance: balance});
        }else{
            return res.json({msg: `HTTP error! status: ${res.status}`})
        }
    } catch(error) {
        res.json({msg : `User already exists Or some error occured ${error}`})
        console.log(error);
        
    }
})


user.post('/signin',middleware, async (req,res)=>{
    const {username,password}= req.body
    try {
        const result = await prisma.user.findFirst({
            where:{
                username,
                password
            }
        })
        if(result){
            const token=jwt.sign({userId:result.id},JWT_SECRET)
            console.log(token);
            
            return res.json({msg: "Logged in succesfully!", token ,firstName:result.firstName,lastName: result.lastName})
        }else{
            return res.json({msg: "User not Found"})
        }
    } catch (error) {
        console.log('backend error hae bc',error);
        
        res.json({msg:`Unable to login. Try again ${error}`})
    }
})

user.put('/',middleware,async (req,res)=>{
    try {
        const {username,firstName,lastName,password}=req.body

        const {userId:id}=req.body;
        const result =await prisma.user.update({
            where:{
                id: Number(id)
            },
            data:{
                username,
                password,
                firstName,
                lastName
            }
        })
        res.status(200).json({result, msg: "User info updated successfully!"});
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ msg: "An error occurred while updating the user." });
    }
})


export default user;