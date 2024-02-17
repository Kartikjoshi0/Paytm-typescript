import React from "react";
import Navbar from '../components/Navbar'
import MyBalance from '../components/MyBalance'
import UserCard from '../components/UserCard'




export default function Dashboard(){
    return (
        <>
        <Navbar />
        <MyBalance />
        {/* <FindUser></FindUser> */}
        </>
    )
}