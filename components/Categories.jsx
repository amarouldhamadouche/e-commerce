/* eslint-disable */
import CategorieItem from "./CategorieItem"
import styles from "../styles/Categories.module.css"
import axios from 'axios'
import {useState,useEffect} gtom 'react'

export default function Categories(){
const [categories,setCategories] = useState([])

  useEffect(()=>{
    const fetchCats = async()=>{
      try{
       const res = typeof(window)!=="undefined" && await axios.get(`${window.location.origin}/api/categories/`)
       setCategories(res.data)
       
      }catch(err){
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





