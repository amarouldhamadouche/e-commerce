import styles from '../styles/Register.module.css'
import {useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { register } from '../redux/apiCall'
import Router from 'next/router'
import Image from 'next/image'

const Register = ({token}) => {
const [name,setName] = useState('')
const [lastName,setLastName] = useState('')
const [username,setUsername] = useState('')
const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
const [confirmPassword,setConfirmPassword] = useState('')
const [passwordToast,setPasswordToast]=useState(false)
const [phoneNumber,setPhoneNumber] = useState('')
const [error,setError] = useState(false)

const dispatch = useDispatch()
let currentUser =  useSelector((state)=>state.user.currentUser)

useEffect(()=>{
  if(currentUser && token){
   Router.push('/')
  }
 },[currentUser,token])
const sendRequest = async(e)=>{
  e.preventDefault()
  if(!name || !lastName || !username || !email || !password || !confirmPassword || password!==confirmPassword){
     return
  }else {
     const res =typeof(window)!=="undefined" &&  await register(dispatch,{name,lastName,username,email,password,phoneNumber})
     res ? Router.push('/') : setError(true)
 
  }
}
  return (
<div className={styles.Container}>
  <div className={styles.imgContainer}>
        <Image src = "https://i.ibb.co/n8qZp9P/Enter-OTP-pana-1.png" alt="" layout="fill" objectFit="contain"/>
             
  </div>
  
   <form className={styles.Form} onSubmit={(e)=>sendRequest(e)}>
    <h1 className={styles.Title}>Sign Up</h1>
    <div className={styles.InputContainer}>
      <input className={styles.Input} value={name} onChange={(e)=>setName(e.target.value)} placeholder='Name' required={true} />
      <input className={styles.Input} value={lastName} onChange={(e)=>setLastName(e.target.value)} placeholder='Last Name' required={true} />
      <input className={styles.Input} value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Username' required={true}/>
      <input className={styles.Input} placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} type='email' required={true}/>
      <input className={styles.Input} minLength={6} placeholder='Password' value={password} onChange={(e)=>{setPassword(e.target.value);e.target.value!==confirmPassword ? setPasswordToast(true):setPasswordToast(false)}} type='password' required={true}/>
      <input className={styles.Input} minLength={6} placeholder='Confirm Password' value ={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value);e.target.value!==password ? setPasswordToast(true):setPasswordToast(false)}} type='password'/>
      {passwordToast && 
      <div style={{color:'red'}}>
        Passwords don't matchs
      </div>}
      <input className={styles.Input} placeholder='Phone Number' value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} type='number' required={true}/>
     </div>
     <div className={styles.Agreement}>BY CREATING AN ACCOUNT I CONSENT TO THE PROCESSING OF MY PERSONAL DATA IN ACCORDANCE WITH THE <b>PRIVACY POLICY</b></div>
    <button className={styles.Button}>CREATE</button>
    {error && <span>something went wrong</span>}
  </form>
  </div>
  )
}

export  const getServerSideProps = (ctx)=>{
  const cookies = ctx.req?.cookies || null
  if (cookies.token){
    return{
     redirect : {
      destination : '/',
      permanent : false
     }
    }
   }
  return{
   props:{
    token:cookies?.token || null
   }
  }
}

export default Register
