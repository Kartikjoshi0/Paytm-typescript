
import React from "react";
import { useRecoilState } from "recoil";
import {firstNameState, usernameState,lastNameState,passwordState} from '../pages/store'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Heading from '../components/Heading'
import Input from '../components/Input'
import Button from '../components/Button'
import BottomNavigator from '../components/BottomNavigator'
import Loader from '../components/Loader'





export default function Signup(){
    const [username,setUserName]=useRecoilState(usernameState)
    const [firstName,setFirstName]=useRecoilState(firstNameState)
    const [lastName, setLastName] = useRecoilState(lastNameState);
    const [password, setPassword] = useRecoilState(passwordState);


    const [loading,setLoading]=useState(false);

    const navigate=useNavigate()

    async function handleSubmit() {
        try {
            setLoading(true)
        const res=await axios.post("http://localhost:406/api/user/signup",{username,firstName,lastName,password})
        const data=res.data;
        
        

        if(data.token){
            alert(`${data.msg} with balance: ${data.balance}`)
            localStorage.setItem('myToken',data.token)
            navigate('/dashboard')
        }else{
            alert(data.msg)
        }
        } catch (error) {
            alert("An error occurred while signing up. Please try again later.");
            console.log("Signup failed:", error);
        }finally{
            setLoading(false)
        }
        
    }


    return(
        <div  className="h-screen flex justify-center items-center bg-gray-200">
            <div  className="w-3/5 max-w-96 rounded-2xl p-6 flex flex-col justify-center bg-white drop-shadow-lg">
                <div className="text-center">
                    <Heading className="font-bold text-3xl m-auto mb-4" pageHeading="Sign up " />
                    <p className="m-auto w-5/6 mb-2 text-gray-700">Enter your information to create an account</p>
                </div>

                <Input value={username} onChange={e => setUserName(e.target.value)} className="border-2 p-1 mb-2 mt-1" label="Username"></Input>
                <Input value={firstName} onChange={e => setFirstName(e.target.value)} className="border-2 p-1 mb-2 mt-1" label="First Name"></Input>
                <Input value={lastName} onChange={e => setLastName(e.target.value)} className="border-2 p-1 mb-2 mt-1" label="Last Name"></Input>
                <Input value={password} onChange={e => setPassword(e.target.value)} className="border-2 p-1 mb-2 mt-1" label="Password"></Input>

                <Button className="border-black border-2 rounded-xl bg-black text-white w-1/2 m-auto mt-2 hover:bg-teal-400" label="Sign-up" onClick={handleSubmit}></Button>
                <BottomNavigator line="Already have an account?" page="/signin" className="underline hover:text-teal-400 cursor-pointer" label="Sign-In"></BottomNavigator>
            </div>
            {loading && <div className="absolute w-full h-full flex flex-col items-center justify-center bg-gray-200 opacity-75">
            <Loader></Loader>
            </div>}
        </div>
    )
}