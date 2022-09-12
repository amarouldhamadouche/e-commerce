import { categories } from "../data"
import CategorieItem from "./CategorieItem"
import styles from "../styles/Categories.module.css"


const Categories = () => {
  return (
   <div className={styles.Container} >
    <h1 className={styles.Title}>
      Categories
    </h1>
   {categories.map((c)=>(
       <CategorieItem key={c.id} item={c}/>
       ))}
    </div>
   
    
  )
}

export default Categories


