/* eslint-disable */
import styles from '../../styles/Admin.module.css'
import axios from 'axios'
import {useState} from 'react'
import AdminOrders from '../../components/admin/AdminOrders.jsx'
import ProductList from '../../components/admin/ProductList'
import Users from '../../components/admin/Users'
import Chart from '../../components/admin/Chart'
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import AdminContact from '../../components/admin/Contact'

const Admin = ({token,Products,orders}) => {
const [menu,setMenu] = useState('products')
const [Orders,setOrders] = useState(orders)

  return (
    <>
    <Navbar token={token}/>
    <div className={styles.container}> 
      <div className={styles.wrapper}>
        <div className={styles.left}>
         <ul className={styles.ul}>
          <li className={styles.li} style={{backgroundColor: menu == 'products'? 'rgba(0, 128, 128,0.2)' : 'whitesmoke',color: menu == 'products'? 'teal' : 'black' }} onClick={()=>setMenu('products')}>
            Products
          </li>
          <li className={styles.li} style={{backgroundColor: menu == 'orders'? 'rgba(0, 128, 128,0.2)' : 'whitesmoke',color: menu == 'orders'? 'teal' : 'black' }} onClick={()=>setMenu('orders')}>
            Orders
          </li>
          <li className={styles.li} style={{backgroundColor: menu == 'users'? 'rgba(0, 128, 128,0.2)' : 'whitesmoke',color: menu == 'users'? 'teal' : 'black' }} onClick={()=>setMenu('users')}>
            Users
          </li>
          <li className={styles.li} style={{backgroundColor: menu == 'chart'? 'rgba(0, 128, 128,0.2)' : 'whitesmoke',color: menu == 'chart'? 'teal' : 'black' }} onClick={()=>setMenu('chart')}>
            Charts
          </li>
          <li className={styles.li} style={{backgroundColor: menu == 'contact'? 'rgba(0, 128, 128,0.2)' : 'whitesmoke',color: menu == 'contact'? 'teal' : 'black' }} onClick={()=>setMenu('contact')}>
            Contacts
          </li>

         </ul>
        </div>
        <div className={styles.right}>
          {menu=="products"?
            <ProductList Products={Products} token={token}/>
            :menu=="orders"? <AdminOrders Orders={Orders} setOrders={setOrders} token={token}/>
            :menu=="users" ? <Users token={token} setOrders={setOrders}/>
            :menu=="chart"?<Chart token={token}/>
            :menu=="contact"&& <AdminContact token={token}/>
          }
        </div>
      </div>
    </div>
    <Footer/>
    </>
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
  const isAdmin = await axios.get(`https:${ctx.req.rawHeaders[1]}/api/admin`,{headers:{token:cookies.token}})
  }catch(err){
  if(err.response.status==403){
   return{
    redirect : {
     destination : '/',
     permanent : false
    }
   }
  }}
  let res
  try{
    res = await axios.get(`https://${ctx.req.rawHeaders[1]}/api/product/find`)
  }catch(err){
    
  }
  let res1
  try{
    res1 = await axios.get(`https://${ctx.req.rawHeaders[1]}/api/order?all=true`,{headers:{token:cookies?.token}})
  
  }catch(err){
    
  }

 return{
  props:{
   token:cookies?.token || null,
   Products: res?.data || null,
   orders:res1?.data || null,
  }
 }
}
export default Admin
