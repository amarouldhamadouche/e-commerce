
import {useState,useEffect} from 'react'
import axios from 'axios'
import styles from '../../styles/Users.module.css'
import UserItem from './UserItem'
import AdminOrders from './Orders'



const Users = ({token,setOrders}) => {

 const [users,setUsers] = useState()
 const [viewOrder,setViewOrder] = useState()

 useEffect(()=>{
   const fetchUsers = async()=>{
    try{
     const res = await axios.get(`http://localhost:3000/api/user/`,{headers:{token:token}})
     setUsers(res.data)
    }catch(err){
     console.log(err)
    }
   }
   fetchUsers()
 },[token])
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{!viewOrder? 'Users':'User_s orders'}</h1>
      {viewOrder && <button style={{padding:'10px',marginBottom:'10px',border:"1px solid teal",backgroundColor:'whitesmoke',color:'teal',fontSize:'15px',cursor:'pointer'}} onClick={()=>setViewOrder(null)}>Turn back</button>}
      {users?.length>0?
      !viewOrder?
      (
        <table className={styles.table}>
          <tr className={styles.tr}>
            <th>Username</th>
            <th>Phone number</th>
            <th>Email</th>
            <th>SignUp at</th>
            <th>He paid</th>
            <th>Actions</th>
          </tr>
          {users.map((u)=>(
             <UserItem key={u._id} User={u} setUsers={setUsers} setViewOrder={setViewOrder} token={token}/>
          ))}
        </table>
      ):(
        <AdminOrders token={token} setOrders={setOrders} userId={viewOrder} setViewOrder={setViewOrder}/>
      ):(
        <div></div>
      )}
    </div>
  )
}

export default Users