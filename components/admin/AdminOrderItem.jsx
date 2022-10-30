/* eslint-disable */
import styles from '../../styles/OrderAdmin.module.css'
import {useState,useEffect} from 'react'
import axios from 'axios'
import Link from 'next/link'

const AdminOrderItem = ({order,token,setOrders,usersOrders,setUsersOrders}) => {
 const [user,setUser] = useState()
 const status = ['on the way','delevring','paid','rejected']

 useEffect(()=>{
  const fetchUser = async()=>{
   try{
    const res = await axios.get(`https://amarouldhamadoucheecommerce.herokuapp.com/api/user/${order.userId}`,{headers:{token:token}})
    setUser(res.data)
   }catch(err){
   }
   
  }
  fetchUser()
 },[order.userId,token])

 const updateUser = async()=>{
  try{
    axios.put(`https://amarouldhamadoucheecommerce.herokuapp.com/api/user/${user._id}`,{hasPaid:user.hasPaid + order.amount},{headers:{token:token}})
    }catch(err){
    }
  }

  


 const changeStatus = async(i)=>{
  try{
   const res = await axios.put(`https://amarouldhamadoucheecommerce.herokuapp.com/api/order/${order._id}`,{status:i},{headers:{token:token}})
    setOrders((prev)=>[res.data,...prev.filter((o)=>o._id!==order._id)])
    usersOrders && setUsersOrders((prev)=>[res.data,...prev.filter((o)=>o._id!==order._id)])
    i==2 && updateUser()
    i==2 && handleSell(res.data) 
  }catch(err){
  }
 }

 const handleSell =(order)=>{
  try{
    const res = order.products.forEach(async(p)=>await axios.post('https://amarouldhamadoucheecommerce.herokuapp.com/api/sales/',{ProductId:p.productId,quantity:p.quantity},{headers:{token:token}}))
    }catch(err){
  }
 }

  return (
    <>
      <td>
       {user && user.username}
      </td>
      <td>
       {user && user.phoneNumber}
      </td>
      <td>
       {order.adress.street}, {order.adress.commune}, {order.adress.wilaya}
      </td>
      <td>
       {order.payementMethod}
      </td>
      <td>
       {order.amount}
      </td>
      <td>
       {status[order.status]}
      </td>
      <td>
       {order.status < 1 ?
       <button className={styles.button} onClick={()=>changeStatus(order.status + 1)}>
        next status
       </button> : order.status==1 &&
       <>
       <button className={styles.button} onClick={()=>changeStatus(2)}>
       delevered
      </button>
      <button className={styles.rejectedButton} onClick={()=>changeStatus(3)}>
       rejected
      </button>
      
      </>}
      <Link href={`/admin/cart/${order.cartId}`} passHref>
       <button className={styles.button}>
        view cart
       </button>
       </Link>
      </td>
    </>
  )
}

export default AdminOrderItem