/* eslint-disable */
import styles from '../../../styles/Cart.module.css'
import CartItem from '../../../components/admin/CartItem'
import axios from 'axios'

const AdminCart = ({cart}) => {

  return (
   <div className={styles.Container}>
   <div className={styles.Bottom}>
     <div className={styles.Products}>
     {cart.products.map((p)=>(
      <CartItem key={p._id} c={p}/>))}
   </div> 
    <div className={styles.SummaryContainer}>
       <h1 className={styles.SummaryTitle}>ORDER SUMMARY</h1>
       <div className={styles.Total}>
         <b>Total:</b>
         <span>{cart.amount} DA</span>
       </div>
     </div>
   </div>
 </div>
  )
}


export  const getServerSideProps = async(ctx)=>{
 const cookies = ctx.req?.cookies || null
 if (!cookies.token){
   return{
    redirect : {
     destination : '/',
     permanent : false
    }
   }
  }
  try{
  const isAdmin = await axios.get('http://localhost:3000/api/admin',{headers:{token:cookies.token}})
  }catch(err){
    
}
  let res
  try{
    res = await axios.get(`http://localhost:3000/api/cart/${ctx.query.id}`,{headers:{token:cookies?.token}})
    
  }catch(err){
    
  }

 return{
  props:{
   token:cookies?.token || null,
   cart: res?.data || null,
  }
 }
}

export default AdminCart