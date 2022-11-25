/* eslint-disable */
import React from 'react'
import {
 LineChart,
 Line,
 XAxis,
 YAxis,
 CartesianGrid,
 Tooltip,
 ResponsiveContainer,
 Legend
} from "recharts";
import {useState,useEffect} from 'react'
import axios from 'axios'

const Chart = ({token,productId}) => {
 const [salesData,setSaleData] = useState()
 const [data,setData] = useState([])
 const [activeButton,setActiveButton] = useState("products")


 useEffect(()=>{
   const saleData = async()=>{
    try{
     const res =activeButton == "products" ? productId ? typeof(window)!=="undefined" && await axios.get(`${window.location.origin}/api/sales/${productId}`,{headers:{token:token}}) : typeof(window)!=="undefined" && await axios.get(`${window.location.origin}/api/sales',{headers:{token:token}}) : typeof(window)!=="undefined" && await axios.get(`${window.location.origin}/api/user/stats/',{headers:{token:token}})
     setData([])
     setSaleData(res.data)
     !productId ? fetchProducts(res.data) : setData([{month:res.data[0]._id,total : res.data[0].total}])
     
     
    }catch(err){
    
    }
   }
   const fetchProducts = async(Data)=>{
    if(activeButton=="products"){
     try{ 
      Data.forEach(async(s)=>{ typeof(window)!=="undefined" && await axios.get(`${window.location.origin}/api/product/find/${s._id}`).then((res)=>{
      setData((prev)=>[...prev,{name:!productId && res?.data?.title || "no disponible",total:s.total}])}).catch((err)=>{})
     })
    }catch(err){
     }
    }else{
     Data.forEach((d)=> setData((prev)=>[...prev,{month:d._id,total:d.total}]))
    }
    }
    
 
   saleData()
   return ()=>{
    setData([])
   }
 },[token,productId,activeButton])

 useEffect(()=>{
 },[data])

  return (
   <div style={{height:"calc(100vh - 200px)", display:'flex',flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
    {!productId &&
    <div style={{display:"flex",width:"100%"}}>
      <button onClick={()=>setActiveButton("products")} style={{backgroundColor: activeButton=="products" ? "teal" : "whitesmoke",border:activeButton=="products" ? "none" : "1px solid teal",color:activeButton=="products"?"white":"teal",cursor:"pointer",margin:"10px 5px",padding:"10px",fontSize:"15px"}}>
       products
      </button>
      <button onClick={()=>setActiveButton('users')} style={{backgroundColor: activeButton=="users" ? "teal" : "whitesmoke",border:activeButton=="users" ? "none" : "1px solid teal",color:activeButton=="users"?"white":"teal",cursor:"pointer",margin:"10px 5px",padding:"10px",fontSize:"15px"}}>
       users
      </button>
    </div>}
   <ResponsiveContainer width=" 60%" height="100%" style={{backgroundColor:'red',marginTop:"20px"}}> 
   {data.length>0 ?
   <LineChart
     width={500}
     height={300}
     data={data}
     margin={{
       top: 5,
       right: 30,
       left: 20,
       bottom: 5,
     }}
   >
    <XAxis dataKey= {!productId && activeButton=="products" ? "name" : "month"  } stroke="#5550bd" activeDot={{ r: 8 }}/>
     <YAxis dataKey='total'  stroke="#5550bd"/>
     <Line type="monotone" dataKey='total' stroke="#5550bd" />
     <Tooltip />
     <Legend/>
   </LineChart> : (
    <div>wait</div>
   )}
   </ResponsiveContainer>
  </div> 
  )
}

export default Chart
