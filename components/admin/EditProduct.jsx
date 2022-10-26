import styles from '../../styles/AddProduct.module.css'
import axios from 'axios'
import {useState,useEffect} from 'react'
import { ArrowBackIos } from '@material-ui/icons'


const EditProduct = ({token,setEdit,setProducts,product}) => {
 
 const [title,setTitle] = useState(product?.title)
 const [desc,setDesc] = useState(product?.desc)
 const [sizes,setSizes] = useState(product?.Sizes) 
 const [colors,setColors] = useState(product?.colors)
 const [price,setPrice] = useState(product?.price)
 const sizesValue = ['S','M','L','XL','XXL']
 const colorsValue = ['red','black','white','blue','green','gray']
 const [categorieName,setCategorieName] = useState('')
 const [categorieFile,setCategorieFile] = useState()
 const [categories,setCategories]= useState([])
 const [selectedCategories,setSelectedCategories] = useState(product?.categories)
 const [addCategorie,setAddCategorie] = useState(false)
 const [isFetching,setIsFetching] = useState(false)
 const [error,setError] = useState(false)
 useEffect(()=>{
  const fetchCat = async()=>{
   try{
   const res = await axios.get("http://localhost:3000/api/categories",{headers:{token:token}})
   setCategories(res.data)
  }catch(err){
   console.log(err)
  }
 }
  fetchCat()
 },[token])

 const handleAddNewCategorie = async ()=>{
  const data = new FormData()
  data.append('file',categorieFile)
  data.append('upload_preset','mqfwolev')
 try{
 const cloudinaryRes = await axios.post("https://api.cloudinary.com/v1_1/UrbanMobile/image/upload",data)
 const {url} = cloudinaryRes.data
    const res = await axios.post('http://localhost:3000/api/categories',{name:categorieName,img:url},{headers:{token:token}})
    setCategories((prev)=>[...prev,res.data])
    setAddCategorie(false)
   }catch(err){
    console.log(err)
   }
 }


 const handleAddNewProduct=async ()=>{
  setError(false)
  setIsFetching(true)
   try{
   const editedProduct = {
     title,
     desc,
     categories:selectedCategories,
     Sizes : sizes,
     colors,
     price
    }
    const res = await axios.put(`http://localhost:3000/api/product/${product._id}`,editedProduct,{headers:{token:token}})
    setProducts((prev)=>[res.data,...prev.filter((p)=>p._id!==product._id)])
    setEdit(false)
    setIsFetching(false)
   }catch(err){
     setIsFetching(false)
     setError(true)
   }
 }
  return (
    <div className={styles.container}>
     <div className={styles.wrapper}>
      <span className={styles.x} onClick={()=>setEdit(false)}>X</span>
      <h1 className={styles.title}>Edit the product</h1>
      <div className={styles.form} >
       <div className={styles.item}>
        <label className={styles.label}>
         Product name
        </label>
        <input className={styles.input} value={title} onChange={(e)=>setTitle(e.target.value)} required={true}/>
       </div>
       <div className={styles.item}>
        <label className={styles.label}>Desc</label>
        <textarea value={desc}  rows={5} type ='text' onChange={(e)=>setDesc(e.target.value)} />
       </div>
       <div className={styles.item}>
        <select required={true} onChange={(e)=>setSelectedCategories((prev)=> [...prev,e.target.value])}>
         <option disabled selected>Select the Categorie</option>
         {categories && categories.map((c)=>(
          <option key={c._id} value={c.name}>{c.name}</option> 
         ))}
        </select>
       </div>
       {selectedCategories &&
         <div style={{display:'flex',marginTop:'5px'}}>
          {selectedCategories.map((s,i)=>(
          <span key={i} style={{padding:'5px',border:'1px solid teal',color:'teal',cursor:'pointer',marginLeft:'5px'}} onClick={()=>setSelectedCategories((prev)=>prev.filter((p)=>p!==s))}>{s}</span> 
         ))}
         </div>
        }
       <div className={styles.item} style={{backgroundColor:'whitesmoke',borderRadius:'10px',padding:'10px 5px'}}>
        <lable className={styles.label} style={{cursor:"pointer"}} onClick={()=>setAddCategorie(!addCategorie)}>Add a categorie
        <ArrowBackIos style={{fontSize:15,  transform: addCategorie? 'rotate(90deg)' : 'rotate(-90deg)',marginLeft:'10px'}} />
        </lable>
        {addCategorie &&  <input className={styles.input} type='file' onChange={(e)=>setCategorieFile(e.target.files[0])}/>}
        {addCategorie && <label className={styles.label}>
         Categorie name
        </label>}
        {addCategorie && <input className={styles.input} value={categorieName} onChange={(e)=>setCategorieName(e.target.value)}/>}
        {addCategorie && <button className={styles.button} style={{width:'40%',margin:"5px 0",padding:'10px'}} onClick={()=>handleAddNewCategorie()}>Add</button>}
       </div>
       <div className={styles.item}>
        <select required={true} onChange={(e)=>setSizes((prev)=>[...prev,e.target.value])}>
         <option disabled selected>Select the sizes</option>
         {sizesValue.map((s,i)=>(
          <option key={i} value={s}>{s}</option>
         ))}
        </select>
        {sizes &&
         <div style={{display:'flex',marginTop:'5px'}}>
          {sizes.map((s,i)=>(
          <span key={i} style={{padding:'5px',border:'1px solid teal',color:'teal',cursor:'pointer',marginLeft:'5px'}} onClick={()=>setSizes((prev)=>prev.filter((p)=>p!==s))}>{s}</span> 
         ))}
         </div>
        }
       </div>
       <div className={styles.item}>
        <label className={styles.label}>
         Select the colors
        </label>
        <div style={{width:'100%',display:'flex'}}>
         {colorsValue.map((c,i)=>(
          <div key={i} style={{backgroundColor:c,height:colors.indexOf(c)!==-1?'50px' : '30px',width:colors.indexOf(c)!==-1?'50px' : '30px',borderRadius:'50%',border:'1px solid black',margin:'0px 5px',cursor:'pointer',transition:'all 0.5s ease'}} onClick={()=>colors.indexOf(c)!==-1?setColors((prev)=>[...prev.filter(p=>p!==c)]) : setColors((prev)=>[...prev,c])}>
          </div>
         ))}
        </div>
       </div>
       <div className={styles.item}>
        <label className={styles.label}>
         Price
        </label>
        <input className={styles.input} value={price} onChange={(e)=>setPrice(e.target.value)} type='number'/>
       </div>
       <button className={styles.button} onClick={()=>handleAddNewProduct()}>{isFetching ? "wait...":"Save"}</button>
       {error && <span style={{color:'red'}}>SOMETHING WENT WRONG</span>}
      </div>
     </div>
    </div>
  )
}

export default EditProduct