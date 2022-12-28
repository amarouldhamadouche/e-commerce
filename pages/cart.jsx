import {useState,useEffect} from 'react'
import styles from '../styles/Cart.module.css'
import  Anounecement from '../components/Anounecement'
import { useSelector,useDispatch } from 'react-redux'
import CartItem from '../components/CartItem'
import Product from '../components/Product'
import { ArrowBackIos } from '@material-ui/icons'
import Router from 'next/router'
import {orderTheCart} from '../redux/cartRedux'
import Navbar from "../components/Navbar"
import Footer from '../components/Footer'
import Link from 'next/link'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'

const OrderAlert = ({setCheckOut,token})=>{
  const currentUser = useSelector((state)=>state.user.currentUser)
  const wilaya = ['adrar','chlef','laghouat','alg']
  const [address,setAddress] = useState()
  const [anotherAddress,setAnotherAddress] = useState([])
  const [addAnotherAddress,setAddAnotherAddress] =useState(false)
  const [payementMethod,setPayementMethod] = useState('cash')
  const [products,setProducts] = useState([])
  const [payWithCard,setPayWithCard] = useState(false)
  const cart = useSelector((state)=>state.cart)
  const dispatch = useDispatch()

  useEffect(()=>{
    setProducts([])
    cart?.products.forEach((p)=>setProducts((prev)=>[...prev,{productId:p.product._id,quantity:p.quantity,color:p.color,size:p.size}]))
     },[cart])

  useEffect(()=>{
    setAddress({...currentUser?.adresses.find((p)=>p._id==currentUser.principleAddress)})
  },[currentUser])   

  const createACart = async()=>{
    if(anotherAddress ||  address){
    try{        
       const req = {
          userId:currentUser?._id,
          products:products,
          amount:cart.total,
        }
       
          const res = typeof(window)!=="undefined" && await axios.post(`${window.location.origin}/api/cart/`,req,{headers:{token:token}})
          createAnOrder(res.data._id)
    }catch(err){

    }}
    
  }



  const createAnOrder = async(cartId)=>{
   
      const req = {
      userId:currentUser?._id,
      products:products,
      amount:cart.total,
      adress:addAnotherAddress?anotherAddress : address,
      payementMethod,
      cartId
    }
    try{
      const res = typeof(window)!=="undefined" && await axios.post( `${window.location.origin}/api/order/${currentUser?._id}`,req,{headers:{token:token}})
      dispatch(orderTheCart())
      Router.push('/order')
    }catch(err){
      
    }
  }

  const handleAddAnotherAddress =(e) =>{
    setAnotherAddress({...anotherAddress,[e.target.name]:e.target.value})
  }
  const [stripeToken,setStripeToken] = useState(null)
  const Key = "pk_test_51LvpBIB7cQd4u2XGDde6BI5OzbmUaJ4L4HXC0CWo9NIsRQa7Rm4LhnROjpm2XjX34WxBR8fxKL33bNeH1xLz8KbF0037lkb3S2"
  const onToken = (token)=>{
   setStripeToken(token)
   setPayementMethod('e_payement') 
  } 

  useEffect(()=>{
    const ePayement = async()=>{
      try{
       const res = typeof(window)!=="undefined" && await axios.post( `${window.location.origin}/api/stripe/payement`,{
        tokenId:stripeToken.id,
        amount:2000
       })
       createACart()
      }catch(err){
        
      }
    }
    stripeToken && ePayement()
  },[stripeToken])
  
  return (
    <div style={{position:'fixed',zIndex:"999999999",display:'flex',flexDirection:"column",alignItems:"center",justifyContent:"center",width:"100vw",height:"100vh",top:0,left:0,backgroundColor:'rgba(000,000,000,0.5)'}}>
      
      <div className={styles.orderAlert}>
       <div onClick={()=>setCheckOut(false)} style={{position:'absolute',width:"30px",height:'30px',borderRadius:'50%',backgroundColor:'crimson',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',color:'white',right:"-10px",top:'-10px'}}>X</div>
        <h1>Create an order</h1>
        {!addAnotherAddress &&(
        <div style={{display:'flex', flexDirection:'column'}}>
        <label style={{marginTop:"20px",marginBottom:'10px',fontWeight:'500'}}>Select an address</label>
        <select style={{padding:'10px'}} onChange={(e)=>{setAddress({...currentUser?.adresses.find((p)=>p._id==e.target.value)})}}>
           {currentUser?.adresses.length>0 && currentUser?.adresses.map((a)=>(
            <option selected={currentUser.principleAddress && a._id == currentUser?.principleAddress? true :false} value ={a._id} key={a._id}>{a.street}, {a.commune}, {a.wilaya} </option>
          ))}
        </select>
        </div>)}
        <div style={{display:'flex',margin:'10px 0',cursor:'pointer'}} onClick={()=>setAddAnotherAddress(!addAnotherAddress)}>
        <span style={{fontWeight:'500'}}>Another address</span>
        <ArrowBackIos  style={{fontSize:15,  transform: addAnotherAddress? 'rotate(90deg)' : 'rotate(-90deg)',marginLeft:'10px'}}/>
        </div>
        {addAnotherAddress && (
       <div style={{width:"100%"}}>
        <div style={{width:'100%',display:"flex",flexDirection:'column'}}>
         
        <label  htmlFor='wilaya'>wilaya</label>
        <select id='wilaya' name='wilaya' style={{padding:"10px"}} onChange={(e)=>handleAddAnotherAddress(e)}>
        <option disabled selected></option>
         {wilaya.map((w,i)=>(
          <option  key={i} value={w}>{w}</option>
         ))}
        </select>
        </div>
        <div style={{width:'100%',display:"flex",flexDirection:'column'}}>
        <label  htmlFor='commune'>commune</label>
        <input name='commune' style={{padding:"10px"}} onChange={(e)=>handleAddAnotherAddress(e)}  />
        </div>
        <div style={{width:'100%',display:"flex",flexDirection:"column"}}>
        <label htmlFor='street'>street</label>
        <input name='street' style={{padding:"10px"}} onChange={(e)=>handleAddAnotherAddress(e)}  />
        </div>
        </div>)}
        <span style={{marginTop:'10px'}}>PAYEMENT METHOD</span>
        <button style={{backgroundColor:'teal',padding:"10px",color:"white",fontWeight:"500",cursor:"pointer",border:'none',margin:'10px 0'}} onClick={()=>createACart()} >CASH</button>
        <StripeCheckout
          name="amar shop"
          description= {`your total is ${cart.total/200} $`}
          amount={cart.total / 2}
          token={onToken}
          stripeKey={Key}
          >
        <button style={{backgroundColor:'crimson',padding:"10px",color:"white",fontWeight:"500",cursor:"pointer",border:'none',width:"100%"}} onClick={()=>setPayWithCard(true)}>VISA CARD</button>
       </StripeCheckout>
      </div>
      </div>
  )
}

const BlockedToast = ({setShowBlockedToast})=>{
  setTimeout(()=>setShowBlockedToast(false),"5000")

  return(
    <div >
      <div style={{width:"30%",backgroundColor:"white",color:"teal",padding:"0px 10px",fontSize:"18px",padding:"10px 0",border:"1px solid teal",margin:"20px 0"}}>
        the admin has blocked you,you can not do the order
      </div>
    </div>
  )
}

const Cart = ({token}) => {
  const cart = useSelector((state)=>state.cart)
  const [showBlockedToast,setShowBlockedToast] = useState(false)
  const [indice,setIndice] = useState('BAG')
  const [checkOut,setCheckOut] = useState(false)
  
  const currentUser = useSelector((state)=>state.user.currentUser)
  
  const handleCheckout = async()=>{
    if (!token){
      return Router.push('/login')
    }
    try{
      const res = typeof(window)!=="undefined" && await axios.get( `${window.location.origin}/api/user/${currentUser?._id}`,{headers:{token:token}})
      if(!res?.data.isBlocked){
        setCheckOut(true)
      }else{
        setShowBlockedToast(true)
      }
     
    }catch(err){

    }
  }

  return (
    <div style={{position:'relative'}}>
      {showBlockedToast && <BlockedToast setShowBlockedToast={setShowBlockedToast}/> }
      {checkOut && <OrderAlert setCheckOut={setCheckOut} token={token} />}
      <Navbar token={token}/>
      <Anounecement/>
      <div className={styles.Container}>
        <h1 className={styles.Title}>YOUR BAG</h1>
        <div className={styles.Top}>
          <Link href={"/productList"} passHref>
          <button className={styles.TopButton}>CONTINUE SHOPPING</button>
          </Link>
          <div className={styles.TopInfo}>
            <div className={styles.TopText} onClick={()=>setIndice('BAG')}>YOUR BAG({cart.products.length})</div>
            <div className={styles.TopText} onClick={()=>setIndice('WISHLIST')}>YOUR WISHLIST({cart.wishList.length})</div>
          </div>
        </div>
        <div className={styles.Bottom}>
          <div className={styles.Products}>
          {indice==='BAG'? cart.products.map((p,i)=>(
           <CartItem key={i} p={p}/>
           
          )):indice==='WISHLIST'&&(
             <Product products={cart.wishList}/>
          )}       
        </div> 
         <div className={styles.SummaryContainer}>
            <h1 className={styles.SummaryTitle}>ORDER SUMMARY</h1>
            <div className={styles.Total}>
              <b>Total:</b>
              <span>{cart.total} DA</span>
            </div>
            <button className={styles.SummaryButton} onClick={()=>handleCheckout()}>CHECKOUT</button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
export  const getServerSideProps = (ctx)=>{
  const cookies = ctx.req?.cookies || null
  return{
   props:{
    token:cookies?.token || null
   }
  }
}

export default Cart
