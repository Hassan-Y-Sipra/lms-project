import {React, useState,useEffect} from 'react'
import axios from "axios"
import { NavLink, useParams } from 'react-router-dom'
import "../../../assets/css/Parts.css"

const Parts = () => {
    const [parts,setParts]=useState([])
    const {id}=useParams()

      const URL=import.meta.env.VITE_URL

      const getParts=()=>{
        axios.get(`${URL}/getparts/${id}`)
        .then((res)=>{
            setParts(res.data)
        }).catch((err)=>{
            console.log(err)
        })
      }
      useEffect(()=>{
        getParts()
      },[id])

  return (
    <>
    <div className='part-page-container'>
        {parts.map((item)=>(
            <div key={item.id} className='part-page-main'>
                <NavLink to={`/partdetail/${item.id}`}>
                    <img src={`/uploads/${item.image}`}/>
                <h3>{item.title}</h3>
                </NavLink>
            </div>
        ))}
    </div>


    </>
  )
}

export default Parts