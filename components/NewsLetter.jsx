import styles from '../styles/NewsLetter.module.css'
import { Send, SettingsPowerSharp } from "@material-ui/icons"
import axios from 'axios' 
import {useState} from 'react'
import { useSelector } from 'react-redux'

const NewsLetter = ({token}) => {
  const [error,setError] = useState(false)
  const [message,setMessage] = useState('')
  const [success,setSuccess] = useState(false)

  const currentUser = useSelector((state)=>state.user?.currentUser)

  const sendMessage = async()=>{
    setError(false)
    setSuccess(false)
    if(currentUser && message){
    try{
     const res = await axios.post('http://localhost:3000/api/contact',{userName:currentUser?.username,text:message},{headers:{token:token}})
     setSuccess(true)
     setMessage('')
     setTimeout(()=>setSuccess(false),'5000')
    }catch(err){
      console.log(err)
      setError(true)
      setTimeout(()=>setError(false),'5000')
      
    }}
  }
  return (
    <div className={styles.Container}>
     <h1 className={styles.Title}>
       NewsLetter
     </h1>
     <div className={styles.Desc}>
       Get timely update from your favorite product
     </div>
     <div className={styles.InputContainer}>
       <input placeholder='your email' value={message} onChange={(e)=>setMessage(e.target.value)} className={styles.Input} type='email'/>
       <button className={styles.Button} onClick={()=>sendMessage()}>
          <Send/>
       </button>
     </div>
     
     {error && <span style={{textAlign:'center',color:'red',fontSize:"18px",margin:'10px 0'}}>something went wrong</span>}
     {success && <span style={{textAlign:'center',color:'green',fontSize:"18px",margin:'10px 0'}}>your message was sent successfuly</span>}
    </div>
  )
}

export default NewsLetter