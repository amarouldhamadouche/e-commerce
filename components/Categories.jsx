import CategorieItem from "./CategorieItem"
import styles from "../styles/Categories.module.css"
import {useState,useEffect} from 'react'
import axios from 'axios'

export default function Categories(){
  const [categories,setCategories] = useState([])

  useEffect(()=>{
    const fetchCats = async()=>{
      try{
       const res = await axios.get('http://localhost:3000/api/categories')
       setCategories(res.data)
       console.log(res.data,'cas')
      }catch(err){
        console.log(err)
      }
    }
    fetchCats()
  },[])

  
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





