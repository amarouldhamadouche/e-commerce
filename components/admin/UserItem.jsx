import React from 'react'
import styles from '../../styles/Users.module.css'
import axios from 'axios'

const UserItem = ({User,setUsers,setViewOrder,token}) => {

  const blockUser = async(action)=>{
    try{
       const resp = await axios.put(`http://localhost:3000/api/user/${User._id}`,{isBlocked:action},{headers:{token:token}})
       setUsers((prev)=>[resp.data,...prev.filter((p)=>p._id!=User._id)])
    }catch(err){
      console.log(err)
    }
  }
 const year = new Date(User?.createdAt).getFullYear()
 const month = new Date(User?.createdAt).getMonth()
 const day = new Date(User?.createdAt).getDate()
  return (
    <tr className={styles.tr}>
     <td>{User?.username}</td>
     <td>{User?.phoneNumber}</td>
     <td>{User?.email}</td>
     <td>{year}.{month}.{day} </td>
     <td>{User?.hasPaid} DA</td>
     <td>
       <button className={styles.button} onClick={()=>blockUser(!User?.isBlocked)} >{User?.isBlocked ? "Unblock":"Block"}</button> 
       <button className={styles.button} onClick={()=>setViewOrder(User._id)}>view orders</button>
     </td>
    </tr>
  )
}

export default UserItem