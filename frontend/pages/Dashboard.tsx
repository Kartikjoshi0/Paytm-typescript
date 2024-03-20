import React from "react";
import Navbar from '../components/Navbar'
import MyBalance from '../components/MyBalance'
import UserCard from '../components/UserCard'
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";




export default function Dashboard(){
    const navigate=useNavigate();
    return (
        <>
        <Navbar />
        <MyBalance />
        {/* <FindUser></FindUser> */}
        <Button className="border-black border-2 rounded-xl bg-black text-white mt-2 ml-20 hover:bg-teal-400" label="SendMoney" onClick={()=>{navigate('/send')}}></Button>
        </>
    )
}