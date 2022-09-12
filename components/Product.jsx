import styles from '../styles/Products.module.css'
import { popularProducts } from '../data'
import ProductItem from './ProductItem'
const Product = ({home}) => {
  return (
    <div className={styles.Container}>
      {home && <h1 className={styles.Title}>Products</h1>}
      {popularProducts.map((p)=>(
         <ProductItem key={p.id} item={p}/>
      ))}
    </div>
  )
}

export default Product