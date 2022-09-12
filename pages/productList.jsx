import styles from '../styles/ProductList.module.css'
import Navbar from '../components/Navbar'
import Anounecement from '../components/Anounecement'
import Footer from '../components/Footer'
import Product from '../components/Product'

const ProductList = () => {
  return (
    <div> 
     <Navbar/>
     <Anounecement/>
     <div className={styles.Container}>
      <h1 className={styles.Title}>Dresses</h1>
      <div className={styles.FilterContainer}>
       <div className={styles.FilterProduct}>
        <h1 className={styles.FilterTitle}>
         Filter Product :
        </h1>
        <select className={styles.FilterSelect}>
         <option disabled selected>Color</option>
          <option>Green</option>
          <option>Red</option>
          <option>Blue</option>
          <option>Black</option>
          <option>White</option>
          <option>Yellow</option>
          <option>Pink</option>
        </select>
        <select className={styles.FilterSelect}>
         <option disabled selected>Size</option>
         <option>XS</option>
         <option>S</option>
         <option>L</option>
         <option>M</option>
         <option>XL</option>
        </select>
       </div>
       <div className={styles.SortProduct}>
        <h1 className={styles.FilterTitle}>Sort Product :</h1>
        <select className={styles.FilterSelect}>
         <option selected>Newest </option>
         <option>Price (asc)</option>
         <option>Black (desc)</option>
        </select>
       </div>
      </div>
     </div>
     <Product/>
     <Footer/>
    </div>
  )
}

export default ProductList