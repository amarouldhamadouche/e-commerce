/* eslint-disable */
import styles from '../../styles/Admin.module.css'
import Image from 'next/image'
import EditProduct from './EditProduct'
import AddProduct from './AddProduct'
import {useState} from 'react'
import Chart from './Chart'
import axios from 'axios'

const ProductList = ({Products,token}) => {
 const [products,setProducts] = useState(Products)
 const [edit,setEdit] = useState()
 const [add,setAdd] = useState(false)
 const [viewStatistic,setViewStatistic] = useState()

 const handleDelete = async(id)=>{
  try{
   const res = const res = typeof(window)!=="undefined" && await axios.get(`${window.location.origin}/api/product/${id}`,{headers:{token:token}})
   if(res.status==200){
    setProducts((prev)=>[...prev.filter((p)=>p._id!==id)])
   }
  }catch(err){
  }
}
  return (
  !viewStatistic ?
   <div className={styles.products}>
   
    {add && <AddProduct token={token} setAdd={setAdd} setProducts={setProducts}  />}
  <button onClick={()=>setAdd(true)} style={{padding:'10px',fontSize:'15px',color:'teal',border:'1px solid teal',backgroundColor:'white', cursor:'pointer'}}>
     Add new product
   </button>
   <h1 className={styles.title}>CHECK OUT UR LIST OF PRODUCTS</h1>
   {products?.length>0 ?
   <table className={styles.table}>
     <tr className={styles.trTitle}>
        <th>
         Products
       </th>
       <th>
          Name
       </th>

       <th >
          Categories
        </th>
       <th >
          Colors
       </th>
       <th>
          Sizes
       </th>
       <th>
          Price
       </th>
       <th>
          Actions
       </th>
       </tr>
       {
         products.map((p)=>(
           <tr className={styles.tr} key={p._id}>
             <td className={styles.imgContainer}>
              {p.img &&  <Image src = {p.img[0]} layout='fill' alt = '' objectFit='contain'/>  }
              </td>
              <td>
               {p.title}
              </td>
              <td>
               {p.categories.map((c,i)=>(
                 <span key={i}> {c},</span> 
               ))}
              </td>
              <td style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100px'}}>
               {p.colors && p.colors.map((c,i)=>(
                 <div style={{width:'20px',height:'20px',borderRadius:'50%',border:'1px solid black',backgroundColor:c,margin:'0 5px'}} key={i}>
                   
                 </div>
               ))}
              </td>
              <td>
               {p.Sizes.map((s,i)=>(
                 <span key={i}> {s},</span>
               ))}
              </td>
              <td>
               {p.price} DA
              </td>
              <td style={{display:'flex',justifyContent:'center'}}>
               <button style={{padding:'10px',backgroundColor:'whitesmoke',cursor:'pointer',border:'1px solid teal',color:'teal',fontSize:'15px',marginRight:'10px'}} onClick={()=> setEdit({...p})}>EDIT</button>
               <button style={{padding:'10px',backgroundColor:'teal',cursor:'pointer',border:'none',color:'white',fontSize:'15px',marginRight:'10px'}} onClick={()=> setViewStatistic(p._id)}>STATISTIC</button>
               <button style={{padding:'10px',backgroundColor:'red',cursor:'pointer',border:'none',color:'white',fontSize:'15px',marginRight:'10px'}} onClick={()=>handleDelete(p._id)}>DELETE</button>
              </td>
              {edit && <EditProduct token={token} setEdit={setEdit} setProducts={setProducts} product={edit}/>}
           </tr>
           
         ))
       }
 </table>:
 <div style={{width:"80%",height:"calc(100vh - 200px)",display:"flex",alignItems:'center',justifyContent:'center'}}>
 <span style={{fontSize:'30px',color:'rgba(000,000,000,0.5)',fontWeight:500}}>there is no products yet</span>
 </div>
 }
 
  </div>
  :(
    <>
    <button style={{padding:'10px',marginBottom:'10px',border:"1px solid teal",backgroundColor:'whitesmoke',color:'teal',fontSize:'15px',cursor:'pointer'}} onClick={()=>setViewStatistic(null)}>Turn back</button>
    <Chart token={token} productId={viewStatistic}  />
    </>
   )
  )
}

export default ProductList
