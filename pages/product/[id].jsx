import {useState} from 'react'
import styles from '../../styles/Product.module.css'
import Navbar from '../../components/Navbar'
import Anounecement from '../../components/Anounecement'
import NewsLetter from '../../components/NewsLetter'
import Footer from '../../components/Footer'
import Image from 'next/image'
import { Add, Remove } from '@material-ui/icons'

const Product = () => {
 const [amount,setAmount] = useState(1)
 const [selectedColor,setSelectedColor] = useState()
 const color = ['white','blue','black']
  return (
    <div>
     <Navbar/>
     <Anounecement/>
     <div className={styles.Container}>
      <div className={styles.Left}>
       <div className={styles.ImageContainer}>
        <Image src='https://images.pexels.com/photos/13085604/pexels-photo-13085604.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load' alt='' layout='fill' objectFit='contain'/>
       </div>
      </div>
      <div className={styles.Right}>
       <h1 className={styles.Title}>
        Lacost
       </h1>
       <div className={styles.Desc}>
        chalenjaire lacoste originale tedrob fi tremtak ma tel9ach khotha chalenjaire lacoste originale tedrob fi tremtak ma tel9ach khotha 
        chalenjaire lacoste originale tedrob fi tremtak ma tel9ach khotha 
        chalenjaire lacoste originale tedrob fi tremtak ma tel9ach khotha 
       </div>
       <span className={styles.Price}>
        4000 DA
       </span>
       <div className={styles.FilterContainer}>
        <div className={styles.Filter}>
         <h2 className={styles.FilterTitle}>Color :</h2>
         <div className={styles.FilterColor} onClick={()=>setSelectedColor(1)} style={{backgroundColor:color[0],  height:selectedColor==1 && '40px', width:selectedColor==1 && '40px' }} ></div>
         <div className={styles.FilterColor} onClick={()=>setSelectedColor(2)} style={{backgroundColor:color[1], height:selectedColor==2 && '40px', width:selectedColor==2 && '40px' }}></div>
         <div className={styles.FilterColor} onClick={()=>setSelectedColor(3)} style={{backgroundColor:color[2], height:selectedColor==3 && '40px', width:selectedColor==3 && '40px' }}></div>
        </div>
        <div className={styles.Filter}>
         <h2 className={styles.FilterTitle}>Size :</h2>
         <select className={styles.FilterSize}>
         <option className={styles.SizeOption}>XS</option>
          <option className={styles.SizeOption}>S</option>
          <option className={styles.SizeOption}>L</option>
          <option className={styles.SizeOption}>M</option>
          <option className={styles.SizeOption}>XL</option>
         </select>
        </div>
       </div>
       <div className={styles.AddContainer}>
        <div className={styles.AmountContainer}>
         <Remove style={{cursor:'pointer'}} onClick={()=>setAmount(amount-1)}/>
         <div className={styles.Amount}>{amount}</div>
         <Add style={{cursor:'pointer'}} onClick={()=>setAmount(amount+1)}/>
        </div>
        <button className={styles.AddButton}>ADD TO CART</button>
       </div>
      </div>
     </div>
     <NewsLetter/>
     <Footer/>
    </div>
  )
}

export default Product