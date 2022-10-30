import React from 'react'
import styles from '../styles/Account.module.css'
import {useState,useEffect} from 'react'
import { updateInfo } from '../redux/userRedux'
import axios from 'axios'

const InformationUpdate = ({currentUser,dispatch,token}) => {
  const [name,setName] = useState()
  const [lastName,setLastName] = useState()
  const [username,setUsername] = useState()
  const [email,setEmail] = useState()
  const [phoneNumber,setPhoneNumber] =useState()
  const [success,setSuccess] = useState(false)
  const [error,setError] =useState(false)

  const handleChange = async(e)=>{
    e.preventDefault()
    setSuccess(false)
    setError(false)
    try{  
    const res = await axios.put( `https://amarouldhamadoucheecommerce.herokuapp.com/api/user/${currentUser?._id}`,{name,lastName,username,email,phoneNumber},{headers:{token:token}}) 
    setSuccess(true)
    dispatch(updateInfo(res.data))
    }catch(err){
     setError(true)
    }
  }
  
  useEffect(()=>{
   setName(currentUser?.name)
   setLastName(currentUser?.lastName)
   setUsername(currentUser?.username)
   setEmail(currentUser?.email)
   setPhoneNumber(currentUser?.phoneNumber)
  },[currentUser])
  return (
  
   <form className={styles.form} onSubmit={(e)=>handleChange(e)}>
   <div className={styles.inputContainer}>
   <label className={styles.label} htmlFor='name'>name</label>
   <input className={styles.input} value={name} required={true} onChange={(e)=>setName(e.target.value)} />
   </div>
   
   <div className={styles.inputContainer}>
   <label className={styles.label} htmlFor='lastName'>lastName</label>
   <input className={styles.input} value={lastName} required={true} onChange={(e)=>setLastName(e.target.value)} />
   </div>
   
   <div className={styles.inputContainer}>
   <label className={styles.label} htmlFor='username'>username</label>
   <input className={styles.input} value={username} required={true} onChange={(e)=> setUsername(e.target.value)} />
   </div>

   <div className={styles.inputContainer}>
   <label className={styles.label} htmlFor='email'>email</label>
   <input className={styles.input} type='email' value={email} required={true} onChange={(e)=> setEmail(e.target.value)} />
   </div>

   <div className={styles.inputContainer}>
   <label className={styles.label} htmlFor='phoneNumber'>Phone number</label>
   <input className={styles.input} type='number' value={phoneNumber} required={true} onChange={(e)=> setPhoneNumber(e.target.value)} />
   </div>
   {success && <span style={{color:'green',width:'100%'}}>YOUR INFORMATIONS HAS CHANGED SUCCESSFULY</span>}
   {error && <span style={{color:'red',fontSize:'13px',margin:'10px 0',width:'100%'}}>SOMETHING WENT WRONG!</span>}
    <div className={styles.buttonContainer }>
     <button className={styles.button} type='submit'>SAVE</button>
   </div>
  </form>
  )
}

export default InformationUpdate