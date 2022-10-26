import axios from 'axios'
import {useState,useEffect} from 'react'
import Image from 'next/image'
import styles from '../../styles/AdminCartItem.module.css'

const CartItem = ({c}) => {
 const [product,setProduct] = useState()

 useEffect(()=>{
  const fetchProduct = async()=>{
   try{
    const res = await axios.get(`http://localhost:3000/api/product/find/${c.productId}`)
    setProduct(res.data)
    console.log('res',res.data)
   }catch(err){
     console.log(err)
     console.log(c.productId,'c')
   }
  }
  fetchProduct()
 },[c])
  return (
    <div className={styles.container}>
     <table className={styles.table} >
      <tbody>
      <tr className={styles.trTitle}>
       <th>Product</th>
       <th>Title</th>
       <th>Color</th>
       <th>Size</th>
       <th>Quantity</th>
       <th>Total</th>
      </tr>
      <tr className={styles.tr}>
       <td>
        <Image src={product && product.img[0]} alt='' width={100} height={100} objectFit='contain'/>
       </td>
       <td>
        {product && product.title}
       </td>
       <td>
        <div style={{width:"100%",height:"100%",display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div style={{width:'30px',height:'30px',borderRadius:'50%',backgroundColor:c.color}}></div>
        </div>
       </td>
       <td >
        {c?.size} 
       </td>
       <td >
        {c?.quantity}
       </td>
       <td>
        {product && c?.quantity * product.price} DA
       </td >
      </tr>
      </tbody>
     </table>
    </div>
  )
}

export default CartItem