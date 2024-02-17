import { useRecoilState } from "recoil";
import Heading from "../components/Heading";
import Input from "../components/Input";
import { firstNameState, lastNameState, passwordState, usernameState } from "../pages/store";
import Button from "../components/Button";
import BottomNavigator from "../components/BottomNavigator";
import { useState } from "react";
import Loader from "../components/Loader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";


export default function EditProfile(){

    const [username,setUserName]=useRecoilState(usernameState)
    const [firstName,setFirstName]=useRecoilState(firstNameState)
    const [lastName,setLastName]=useRecoilState(lastNameState)
    const [password,setPassword]=useRecoilState(passwordState)

    const [loading, setLoading] = useState(false);

    const navigate=useNavigate()
    const handleSubmit=async ()=>{
        setLoading(true)
        try {
            const res=await axios.put("http://localhost:406/api/user/",{username,password,firstName,lastName},{
        headers:{
            'Authorization': `Bearer${localStorage.getItem('myToken')}`
        }})
        const data=res.data;
        alert(data.msg)
        navigate('/dashboard')
        } catch (error) {
            console.log(error);
            
        }
    
    }


    return (
        <div className="h-screen flex justify-center items-center bg-gray-200">
        <div className="rounded-2xl p-6 flex flex-col justify-center bg-white drop-shadow-xl">
        <div className="text-center">
            <Heading pageHeading="Update User Info" className="text-3xl text-bold mb-2"></Heading>
            <p className="m-auto w-5/6 mb-2 text-gray-700">Enter your updated account details here</p>
        </div>

            <Input value={username} onChange={e => setUserName(e.target.value)}className="border-2 p-1 mb-2 mt-1" label="Username"></Input>
            <Input value={firstName} onChange={e => setFirstName(e.target.value)}className="border-2 p-1 mb-2 mt-1" label="Password"></Input>
            <Input value={lastName} onChange={e => setLastName(e.target.value)} className="border-2 p-1 mb-2 mt-1" label="Last Name"></Input>
            <Input value={password} onChange={e => setPassword(e.target.value)} className="border-2 p-1 mb-2 mt-1" label="Password"></Input>
                
            <Button className="border-black border-2 rounded-xl bg-black text-white mt-2 w-1/2 m-auto hover:bg-teal-400" label="Update" onClick={handleSubmit}></Button>
            <BottomNavigator line="Don't want to update?" page="/dashboard" className="underline hover:text-teal-400 cursor-pointer" label="Dashboard"></BottomNavigator>
        </div>
        {loading && <div className="absolute w-full h-full flex flex-col items-center justify-center bg-gray-200 opacity-75">
        <Loader></Loader>
        </div>}
    </div>
    )
}