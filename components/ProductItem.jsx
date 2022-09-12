import styles from '../styles/ProductItem.module.css'
import Image from 'next/image'
import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@material-ui/icons'
const ProductItem = ({item}) => {
  return (
    <div className={styles.Container}>
     <div className={styles.ImageContainer}>
       <Image src={item.img} alt='' layout='fill' objectFit='contain'/>
    </div>
    <div className={styles.Info}>
      <div className={styles.Icon}>
         <ShoppingCartOutlined/>
       </div>
       <div className={styles.Icon}>
         <SearchOutlined/>
       </div> 
       <div className={styles.Icon}>
         <FavoriteBorderOutlined/>
       </div>
    </div>
    
   </div> 
  )
}

export default ProductItem 