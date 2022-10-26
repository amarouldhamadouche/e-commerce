import React from 'react'
import {useState,useEffect} from 'react'
import styles from '../styles/Cart.module.css'
import Image from 'next/image'
import { Add, Remove } from '@material-ui/icons'
import { useDispatch } from 'react-redux'
import { decreaseProduct,increaseProduct,removeProduct } from '../redux/cartRedux'

 const CartItem = ({p}) => {
 const [amount,setAmount] = useState()
 const dispatch = useDispatch()
 useEffect(()=>{
   setAmount(p.quantity)
 },[p])
 const increaseQuantity = (p,amount)=>{
  dispatch(increaseProduct({...p,quantity:amount}))
 }
 const decreaseQuantity = (p,amount)=>{
  dispatch(decreaseProduct({...p,quantity:amount}))
 }
  return (
   <>
   <div  className={styles.ProductContainer}>
   <div className={styles.ProductInfo}>
    <div className={styles.ImageContainer}>
     <Image src={p.product?.img[0]} alt='' layout='fill' objectFit='contain'/>
    </div> 
    <div className={styles.Detail}>
    <div className={styles.DetailItem}>
     <b>Products :</b>{p.product.title}
    </div>
    <div className={styles.DetailItem}>
     <b>Id :</b>{p.product._id}
    </div>
    <div className={styles.Color} style={{backgroundColor:p.color}}></div>
    <div className={styles.DetailItem}>
      <b>Size :</b>{p.size}
    </div>
   </div>
   </div>
   <div className={styles.PriceInfo}>
   <div className={styles.AmountContainer}>
    <Add onClick={()=>{setAmount(amount+1) ;increaseQuantity(p,++amount)}} style={{cursor:'pointer'}}/>
    <span className={styles.Amount}>{amount} </span>
    <Remove onClick={()=>{setAmount(amount-1) ; decreaseQuantity(p,--amount)}} style={{cursor:'pointer'}}/>
  </div>
  <span className={styles.Price}>{p.quantity*p.product.price} DA</span>
</div>
</div>
<div className={styles.buttonContainer}>
  <button onClick={()=>{dispatch(removeProduct(p));console.log(p)}} className={styles.button}>REMOVE ITEM FROM THE CART</button>
</div>
<hr className={styles.Hr}></hr>
</>

  )
}

export default CartItem