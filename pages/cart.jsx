import {useState} from 'react'
import styles from '../styles/Cart.module.css'
import Navbar from '../components/Navbar'
import  Anounecement from '../components/Anounecement'
import Footer from '../components/Footer'
import Image from 'next/image'
import { Add, Remove } from '@material-ui/icons'

const Cart = () => {
  const [amount,setAmount] = useState(1)
  return (
    <div>
      <Navbar/>
      <Anounecement/>
      <div className={styles.Container}>
        <h1 className={styles.Title}>YOUR BAG</h1>
        <div className={styles.Top}>
          <button className={styles.TopButton}>CONTINUE SHOPPING</button>
          <div className={styles.TopInfo}>
            <div className={styles.TopText}>YOUR BAG(2)</div>
            <div className={styles.TopText}>YOUR WISHLIST(0)</div>
          </div>
          <button className={styles.TopButton}>CHECKOUT NOW</button>
        </div>
        <div className={styles.Bottom}>
          <div className={styles.Products}>
          <div className={styles.ProductContainer}>
            <div className={styles.ProductInfo}>
              <div className={styles.ImageContainer}>
               <Image src='https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png' alt='' layout='fill' objectFit='contain'/>
               </div> 
               <div className={styles.Detail}>
                <div className={styles.DetailItem}>
                  <b>Products :</b>Lacoste
                </div>
                <div className={styles.DetailItem}>
                  <b>Id :</b>03498434804848
                </div>
                <div className={styles.Color} style={{backgroundColor:'white'}}></div>
                <div className={styles.DetailItem}>
                  <b>Size :</b>375
                </div>
               </div>
            </div>
            <div className={styles.PriceInfo}>
              <div className={styles.AmountContainer}>
                <Add onClick={()=>setAmount(amount+1)} style={{cursor:'pointer'}}/>
                <span className={styles.Amount}>{amount} </span>
                <Remove onClick={()=>setAmount(amount-1)} style={{cursor:'pointer'}}/>
              </div>
              <span className={styles.Price}>30 DA</span>
            </div>
          </div>
          <hr className={styles.Hr}></hr>
          <div className={styles.ProductContainer}>
            <div className={styles.ProductInfo}>
              <div className={styles.ImageContainer}>
               <Image src='https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png' alt='' layout='fill' objectFit='contain'/>
               </div> 
               <div className={styles.Detail}>
                <div className={styles.DetailItem}>
                  <b>Products :</b>Lacoste
                </div>
                <div className={styles.DetailItem}>
                  <b>Id :</b>03498434804848
                </div>
                <div className={styles.Color} style={{backgroundColor:'white'}}></div>
                <div className={styles.DetailItem}>
                  <b>Size :</b>375
                </div>
               </div>
            </div>
            <div className={styles.PriceInfo}>
              <div className={styles.AmountContainer}>
                <Add onClick={()=>setAmount(amount+1)} style={{cursor:'pointer'}}/>
                <span className={styles.Amount}>{amount} </span>
                <Remove onClick={()=>setAmount(amount-1)} style={{cursor:'pointer'}}/>
              </div>
              <span className={styles.Price}>30 DA</span>
            </div>
          </div>
          
          </div> 
          <div className={styles.SummaryContainer}>
            <h1 className={styles.SummaryTitle}>ORDER SUMMARY</h1>
            <div className={styles.Total}>
              <b>Total:</b>
              <span> 60 DA</span>
            </div>
            <button className={styles.SummaryButton}>CHECKOUT</button>
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  )
}

export default Cart