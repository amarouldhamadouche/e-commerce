import { Badge } from "@material-ui/core";
import styles from '../styles/Navbar.module.css'
import { Search,ShoppingCartOutlined,AccountCircleOutlined} from "@material-ui/icons"
import { useSelector } from 'react-redux'
import {useState,useEffect} from 'react'
import Link from 'next/link'
import axios from "axios"

const Navbar = ({token}) => {
  const quantity = useSelector((state)=>state.cart.quantity) 
  const currentUser = useSelector((state)=>state.user.currentUser) || null
  const [query,setQuery] = useState('')
  const [products,setProducts] = useState([])

  useEffect(()=>{
    const fetchProducts = async()=>{
      try{
        const res = await axios.get('https://amarouldhamadoucheecommerce.herokuapp.com/api/product/find/')
        setProducts(res.data)
      }catch(err){
        
      }
    }
    fetchProducts()
  },[token])

  return (
    <div className={styles.Container}>
     <div className={styles.Left}>
        <div className={styles.Language}>
        EN
        </div>
        <div style={{position:"relative"}}>
       <div className={styles.SearchContainer}>
         <input className={styles.Input} value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search"/>
         <Search/>
       </div>
       <ul style={{position:"absolute",backgroundColor:"white",padding:0,listStyle:"none",width:"100%",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
           {query && products?.filter((p)=>p.title.toLowerCase().includes(query.toLowerCase())).map((p)=>(
            <Link key={p._id} href={`/product/${p._id}`} passHref>
             <li style={{padding:"10px",cursor:"pointer",fontSize:"18px"}}>{p.title} </li>
            </Link>
           ))}
         </ul>
      </div>
     </div>
     <Link href={'/'} passHref>
     <div className={styles.Center}>
       Amar.
     </div>
     </Link>
     
     <div className={styles.Right}>
     {!currentUser && !token &&
     <Link href={"/register"} passHref>
       <span className={styles.MenuItem2}>Sign up</span>
       </Link>}
       {!currentUser && !token &&
     <Link href={"/login"} passHref>
       <span className={styles.MenuItem2}>Sign in</span>
       </Link>}
       <span className={styles.MenuItem}>
        <Link href={"/cart"} passHref>
         <Badge badgeContent={quantity} color="secondary">
          <ShoppingCartOutlined color="action" />
         </Badge>
       </Link>
       </span>
       {currentUser && token &&
       <Link href={'/account'} passHref>
       <span className={styles.MenuItem}>
         <AccountCircleOutlined color='action'/>
       </span>
       </Link>}
     </div>
    </div>
  )
}

export default Navbar