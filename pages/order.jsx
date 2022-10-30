import styles from '../styles/Order.module.css'
import axios from 'axios'
import {useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import OrderItem from '../components/OrderItem'
import Navbar from "../components/Navbar"
import Image from 'next/image'

const Order = ({token,setViewItem}) => {
 const currentUser = useSelector((state)=>state.user?.currentUser)
 const [orders,setOrder] = useState([])
 const [activeButton,setActiveButton] = useState('current')

 const statusHandler = (status,index)=>{
  if (status - index > 0){
   return styles.done
  }else if(status - index == 0){
   return styles.inProgress
  } else{
   return styles.unDone
  }
 }

useEffect(()=>{
  const fetchOrder = async()=>{
  
    try{
     const res = await axios.get(`https://amarouldhamadoucheecommerce.herokuapp.com/api/order?userId=${currentUser._id}`,{
       headers: {
         'token': token
       },
     })
     setOrder(res.data.sort((a,b)=>new Date(b.createdAt) - new Date(a.createdAt)))
    }catch(err){
      
    }
   }
   fetchOrder()
},[currentUser._id,token])
 
  return (
    <>
    <Navbar token={token}/>
    <div className={styles.container}>
      <h1 className={styles.title}>Check your orders</h1>
      <div className={styles.buttonContainer}>
        <button onClick={()=>setActiveButton('current')} className={styles.button} style={{backgroundColor:activeButton=='current'?'teal':"white",border:activeButton=='current'?'none':'1px solid teal',color:activeButton=='current'?'white':'teal'}}>current orders</button>
        <button onClick={()=>setActiveButton('old')} className={styles.button} style={{backgroundColor:activeButton=='old'?'teal':"white",border:activeButton=='old'?'none':'1px solid teal',color:activeButton=='old'?'white':'teal'}}>old orders</button>
      </div>
      {orders &&  orders.filter((o)=>activeButton=='current' ? o.status<2:o.status>=2).map((o)=>(
      <>
      <div  key={o._id} className={styles.orderItem}>
      <div className={styles.right}>  
       <table  className={styles.table}>
       <tr className={styles.trTitle}>
         <th >Product</th>
         <th>Color</th>
         <th>Size</th>
         <th>Quantity</th>
         <th>Total</th>
       </tr>
       {o.products.map((p)=>(
        <tr className={styles.tr} key={p._id}>
          <OrderItem  Product={p}/>
        </tr>  
       ))}
   
  </table>
  </div>
  <div className={styles.left}>
    <div className={styles.status}>
      <span className={styles.leftTitle}>STATUS</span>
      <div className={styles.statusContainer}>
      <div className={statusHandler(o.status,0)}>
       <Image src='/images/bike.png' alt='' width='40px' height='40px' objectFit='contain'/>
       <div>On the way</div> 
       <Image className={styles.checkedImg} src='/images/checked.png' alt='' width='20px' height='20px' objectFit='contain'/>
      </div>
      <div className={statusHandler(o.status,1)}>
       <Image src='/images/delivered.png' alt='' width='40px' height='40px' objectFit='contain'/>
       <div>Delivered</div> 
       <Image className={styles.checkedImg} src='/images/checked.png' alt='' width='20px' height='20px' objectFit='contain'/>
      </div>
      </div>
    </div>
    <div className={styles.address}>
      <span className={styles.leftTitle}>ADDRESS</span>
      <span className={styles.leftText}>{o.adress.street}, {o.adress.commune}, {o.adress.wilaya} </span>
    </div>
    <div className={styles.total}>
      <span className={styles.leftTitle}>TOTAL</span>
      <span>{o.amount} DA</span>
    </div>
  </div>
  </div>
  
  <hr className={styles.hr}></hr>
  </>
  
  ))}
    </div>
    </>
  )
}


export  const getServerSideProps = (ctx)=>{
 const cookies = ctx.req?.cookies || null
 if (!cookies?.token){
   return{
    redirect : {
     destination : '/login',
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

export default Order