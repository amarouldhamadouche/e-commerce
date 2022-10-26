import styles from '../styles/Login.module.css'
import { login } from '../redux/apiCall'
import {useState} from 'react'
import Router from 'next/router'
import {useDispatch} from 'react-redux'
import Link from 'next/link'
import Image from 'next/image'

const Login = ({token}) => {
  const [email,setEmail] =useState('')
  const [password,setPassword] = useState('')
  
  const dispatch = useDispatch()

  const loginRequest = async(e)=>{
    e.preventDefault()
    if(email&&password){
     const res = await login(dispatch,{email,password})
     res && Router.push('/')
    }
  }


  return (
    <div className={styles.Container}>
      <div className={styles.imgContainer}>
        <Image src = "https://i.ibb.co/n8qZp9P/Enter-OTP-pana-1.png" alt="" layout="fill" objectFit="contain"/>
      </div>
     <form className={styles.Form} onSubmit={(e)=>loginRequest(e)}>
      <h1 className={styles.Title}>Sign In</h1>
      <input className={styles.Input} value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Your username or email'/>
      <input className={styles.Input} value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder='Your password' type='password'/>
      <button className={styles.Button}>Login</button>
      <Link href={'/register'} passHref>
        <div className={styles.CreateNewAcc}>CREATE A NEW ACCOUNT</div>
      </Link>
     </form>
    </div>
  )
}

export  const getServerSideProps = (ctx)=>{
  const cookies = ctx.req?.cookies || null
  if (cookies?.token){
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
export default Login