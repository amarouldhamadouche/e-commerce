import {useState,useEffect} from 'react'
import styles from '../styles/ProductList.module.css'
import Product from '../components/Product'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'

const ProductList = ({token,products}) => {
  const [sort,setSort] = useState()
  const [filters,setFilters] = useState([])
  const [filteredProducts,setFilteredProducts] = useState([])

  useEffect(()=>{
    setFilteredProducts(
       products.filter((item) =>
         Object.entries(filters).every(([key, value]) =>
           item[key].indexOf(value)!==-1)))
         
   },[filters,products])
 
   useEffect(() => {
     if (sort == "newest") {
       setFilteredProducts((prev) =>
         [...prev].sort((a, b) =>new Date(b.createdAt) - new Date(a.createdAt))
       );
     } else if (sort === "asc") {
       setFilteredProducts((prev) =>
         [...prev].sort((a, b) => a.price - b.price)
       );
     } else {
       setFilteredProducts((prev) =>
         [...prev].sort((a, b) => b.price - a.price)
       );
     }
   }, [sort]);

  const handleFilters = (e)=>{
    setFilters({...filters,[e.target.name]:e.target.value})
    console.log(filters,'filters')
  }
  return (
    <div> 
     <Navbar token={token}/>
     <div className={styles.Container}>
      <h1 className={styles.Title}>Dresses</h1>
      <div className={styles.FilterContainer}>
       <div className={styles.FilterProduct}>
        <h1 className={styles.FilterTitle}>
         Filter Product :
        </h1>
        <select name='colors' className={styles.FilterSelect} onChange={(e)=>handleFilters(e)}>
         <option disabled selected>Color</option>
          <option value='green'>Green</option>
          <option value='red'>Red</option>
          <option value='blue'>Blue</option>
          <option value='black'>Black</option>
          <option value='white'>White</option>
          <option value='yellow'>Yellow</option>
          <option value='pink'>Pink</option>
        </select>
        <select name='Sizes' className={styles.FilterSelect} onChange={(e)=>handleFilters(e)}>
         <option disabled selected>Size</option>
         <option value='XS'>XS</option>
         <option value='S'>S</option>
         <option value='L'>L</option>
         <option value='M'>M</option>
         <option value='XL'>XL</option>
        </select>
       </div>
       <div className={styles.SortProduct}>
        <h1 className={styles.FilterTitle}>Sort Product :</h1>
        <select className={styles.FilterSelect} onChange={(e)=>setSort(e.target.value)}>
         <option selected value='newest'>Newest </option>
         <option value='asc'>Price (asc)</option>
         <option value='desc'>Black (desc)</option>
        </select>
       </div>
      </div>
      <Product products={filters? filteredProducts:products}  />
     </div>
    <Footer/>
    </div>
  )
}

export const getServerSideProps =  async(ctx)=>{
  const cookies = ctx.req?.cookies || null
  let cat = ctx.query.cat
  const res =!cat ? await axios.get(`http://localhost:3000/api/product/find`) :  await axios.get(`http://localhost:3000/api/product/find?categorie=${cat}`)
  return {
    props : {
      token : cookies?.token || null,
      products : res.data
    }
  }
  }
export default ProductList