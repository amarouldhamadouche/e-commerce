import styles from '../styles/Products.module.css'
import ProductItem from './ProductItem'

const Product = ({home,products}) => {

  return (
    <div className={styles.Container}>
      {home && <h1 className={styles.Title}>Products</h1>}
      {products && products.map((p)=>(
         <ProductItem key={p._id}  item={p}/>
      ))}
    </div>
  )
}

export default Product