import { useRecoilState } from "recoil";
import axios from 'axios'

import {balanceState} from '../pages/store'
import React, { useEffect } from "react";

export default function MyBalance (){
    const [balance,setBalance]= useRecoilState(balanceState)

    const headers={
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('myToken')}`
    }
    useEffect(()=>{
        axios.get('http://localhost:406/api/account/balance',{headers:headers})
        .then(res=>res.data)
        .then(data=>{
            if(data.status > 200){
                alert(data.msg)
            }else{
                setBalance(data.msg.balance)
            }
        })
    },[])



    return(
        <>
        <h1 className="text-bold text-xl m-5">Your Balance: {balance}</h1>
        <hr />
        </>
    )
}