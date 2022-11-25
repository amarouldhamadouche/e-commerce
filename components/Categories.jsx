/* eslint-disable */
import CategorieItem from "./CategorieItem"
import styles from "../styles/Categories.module.css"
import axios from 'axios'

export default function Categories({categories}){

 

  
  return (
   <div className={styles.Container} >
    <h1 className={styles.Title}>
      Categories
    </h1>
   {categories.length>0 && categories.map((c)=>(
       <CategorieItem key={c._id} item={c}/> 
       ))}
    </div>
   
    
  )
}





