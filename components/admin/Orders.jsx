import {useState,useEffect} from 'react'
import styles from '../../styles/OrderAdmin.module.css'
import axios from 'axios'
import AdminOrderItem from './AdminOrderItem'


const AdminOrders = ({token,Orders,userId,setOrders}) => {
  const [activeButton,setActiveButton] = useState('current')
  const [usersOrders,setUsersOrders] = useState()

  useEffect(()=>{
    const fetchUserOrder = async()=>{
      try{
        const res = await axios.get(`http://localhost:3000/api/order?userId=${userId}`,{headers:{token:token}})
        setUsersOrders(res.data)
      }catch(err){
        console.log(err)
      }
    }
    userId && fetchUserOrder()
  },[userId,token,setOrders])


  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <button onClick={()=>setActiveButton('current')} style={{backgroundColor:activeButton=='current'?'teal':'whitesmoke',border:activeButton=='current'?'none':'1px solid teal',color:activeButton=='current'?'white':'teal'}} className={styles.button}>CURRENT ORDER</button>
        <button onClick={()=>setActiveButton('delivered')} style={{backgroundColor:activeButton=='delivered'?'teal':'whitesmoke',border:activeButton=='delivered'?'none':'1px solid teal',color:activeButton=='delivered'?'white':'teal'}} className={styles.button}>DELIVERED ORDER</button>
        <button onClick={()=>setActiveButton('rejected')} style={{backgroundColor:activeButton=='rejected'?'teal':'whitesmoke',border:activeButton=='rejected'?'none':'1px solid teal',color:activeButton=='rejected'?'white':'teal'}} className={styles.button}>REJECTED ORDER</button>
      </div>
      {!userId && Orders && Orders.filter((o)=>activeButton=='current'?o.status<2:activeButton=='delivered'?o.status==2:o.status==3).length>0 ?
       (<table  className={styles.table}>
        <tr className={styles.trTitle}>
         <th>Customer</th>
         <th>Phone number</th>
         <th>Address</th>
         <th>Payement method</th>
         <th>Amount</th>
         <th>Status</th>
         <th>Action</th>
       </tr>
       {Orders && Orders.filter((o)=>activeButton=='current'?o.status<2:activeButton=='delivered'?o.status==2:o.status==3).sort((a,b)=>new Date(b.createdAt) - new Date(a.createdAt)).map((o)=>(
        <tr key={o._id} className={styles.tr}>
        <AdminOrderItem token={token} order={o} setOrders={setOrders} />
        </tr>
       ))}
      </table>):
        userId && usersOrders && usersOrders.filter((o)=>activeButton=='current'?o.status<2:activeButton=='delivered'?o.status==2:o.status==3).length>0 ?
      (
          <table  className={styles.table}>
          <tr className={styles.trTitle}>
           <th>Customer</th>
           <th>Phone number</th>
           <th>Address</th>
           <th>Payement method</th>
           <th>Amount</th>
           <th>Status</th>
           <th>Action</th>
         </tr>
         {usersOrders && usersOrders.filter((o)=>activeButton=='current'?o.status<2:activeButton=='delivered'?o.status==2:o.status==3).sort((a,b)=>new Date(a.createdAt) - new Date(b.createdAt)).map((o)=>(
          <tr key={o._id} className={styles.tr}>
          <AdminOrderItem token={token} order={o}  setOrders={setOrders} usersOrders={usersOrders} setUsersOrders={setUsersOrders}/>
          </tr>))}
          </table>):(
        <div style={{width:"80%",height:"calc(100vh - 200px)",display:"flex",alignItems:'center',justifyContent:'center'}}>
         <span style={{fontSize:'30px',color:'rgba(000,000,000,0.5)',fontWeight:500}}>there is no orders yet</span>
        </div>)
       }
    </div>
  )
}

export default AdminOrders