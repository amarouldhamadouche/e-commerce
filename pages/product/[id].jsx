import {useState} from 'react'
import styles from '../../styles/Product.module.css'
import axios from 'axios'
import Anounecement from '../../components/Anounecement'
import NewsLetter from '../../components/NewsLetter'
import Footer from '../../components/Footer'
import Image from 'next/image'
import { Add, Remove } from '@material-ui/icons'
import {useDispatch} from 'react-redux'
import {addProduct} from '../../redux/cartRedux'
import { useRouter } from 'next/router'
import Navbar from '../../components/Navbar.jsx'

const Product = ({token,product}) => {
 const [quantity,setquantity] = useState(1)
 const [color,setcolor] = useState(product?.colors[0])
 const [size,setSize] = useState(product?.Sizes[0])
 const [heroImage,setHeroImage] = useState(product?.img[0])
 const dispatch = useDispatch()
 const router = useRouter()

 const handleAddToCart = ()=>{
  
   const Product = {
    product:product,
    quantity,
    color,
    size,
   }
   dispatch(addProduct(Product))
   router.push('/cart')
 }

  return (
    <div>
      <Navbar token={token}/>
     <Anounecement/>
     <div className={styles.Container}>
      <div className={styles.Left}>
       <div className={styles.heroImageContainer}>
        <Image src={heroImage} alt='' layout='fill' objectFit='contain'/>
       </div>
       <div style={{width:"100%",height:"50px",display:"flex",justifyContent:'center'}}>
        
        {product.img.filter(i=>i!==heroImage).map((pi,i)=>
           (
            <div key={i} className={styles.authorImages} onClick={()=>setHeroImage(pi)}>
              <Image src={pi} alt='' layout='fill' objectFit='cover'/>
            </div>
          )
        )}
       </div>
      </div>
      <div className={styles.Right}>
       <h1 className={styles.Title}>
        {product?.title}
       </h1>
       <div className={styles.Desc}>
        {product?.desc}
       </div>
       <span className={styles.Price}>
        {product?.price} DA
       </span>
       <div className={styles.FilterContainer}>
        <div className={styles.Filter}>
         <h2 className={styles.FilterTitle}>Color :</h2>
         {product?.colors.map((c,i)=>(
          <div key={i} className={styles.FilterColor} onClick={()=>setcolor(c)} style={{backgroundColor:c,  height:color==c && '40px', width:color==c && '40px' }} ></div>
         ))}
         
        </div>
        <div className={styles.Filter}>
         <h2 className={styles.FilterTitle}>Size :</h2>
         <select className={styles.FilterSize} onChange={(e)=>setSize(e.target.value)}>
          {product?.Sizes.map((s,i)=>(
             <option key={i} className={styles.SizeOption} value={s}>{s}</option>
          ))}
         </select>
        </div>
       </div>
       <div className={styles.AddContainer}>
        <div className={styles.AmountContainer}>
         <Remove style={{cursor:'pointer'}} onClick={()=>quantity!=1 && setquantity(quantity-1)}/>
         <div className={styles.Amount}>{quantity}</div>
         <Add style={{cursor:'pointer'}} onClick={()=>setquantity(quantity+1)}/>
        </div>
        <button className={styles.AddButton} onClick={()=>handleAddToCart()}>ADD TO CART</button>
       </div>
      </div>
     </div>
     <Footer/>
    </div>
  )
}

export const getServerSideProps = async(ctx)=>{
  const cookies = ctx.req?.cookies || null
  const res = await axios.get(`http://localhost:3000/api/product/find/${ctx.query.id}`)
  return{
  props:{
      token : cookies?.token || null,
      product:res.data
    }
  }
}

export default Product