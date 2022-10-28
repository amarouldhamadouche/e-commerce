/* eslint-disable */
import {useState,useEffect} from 'react'
import axios from 'axios'
import styles from '../../styles/OrderAdmin.module.css'

const AdminContact = ({token}) => {
 const [contacts,setContacts] = useState()

 useEffect(()=>{
  const fetchContacts = async()=>{
   try{
    const res = await axios.get("http://localhost:3000/api/contact",{headers:{token:token}})
    setContacts(res.data.sort((a,b)=>new Date(b.createdAt) - new Date(a.createdAt)))
   }catch(err){
   } 
  }
  fetchContacts()
 },[token])

  return (
    <div>
     <h1>Contacts</h1>
     {contacts && 
   
       contacts.map((c)=>(
         <div key={c._id} style={{backgroundColor:"white",borderRadius:"10px",padding:"10px 5px",margin:'10px 0'}}>
         <div style={{margin:"10px 0"}}>
         <span style={{fontSize:"18px",fontWeight:500}}> {c?.userName}</span>
         <span style={{fontSize:"13px",color:"gray",marginLeft:"10px"}}> {new Date(c?.createdAt).getFullYear()}.{new Date(c?.createdAt).getMonth()}.{new Date(c?.createdAt).getDate()} </span>
         </div>
          <span style={{fontSize:"18px"}}> {c?.text} </span>
       </div>
       ))}
         
    </div>
  )
}

export default AdminContact