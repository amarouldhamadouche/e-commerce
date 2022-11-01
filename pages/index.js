import Head from 'next/head'
import Anounecement from '../components/Anounecement'
import Categories from '../components/Categories'
import NewsLetter from '../components/NewsLetter'
import Product from '../components/Product'
import Slide from '../components/Slide'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {updateInfo} from '../redux/userRedux'
import { useDispatch } from 'react-redux'
import {useEffect} from 'react'

export default function Home({token,products}) {
  const dispatch = useDispatch()
 useEffect(()=>{
   !token && dispatch(updateInfo(null))
 },[token])

  return (
    <div >
      <Head>
        <title>Amar Ecommerce</title>
        <meta name="description" content="Tiaret Ecommerce" />
        <meta name="description" content="Amar Ecommerce" />
        <link rel="icon" href="/favicon.ico" />
       </Head>
       <Navbar token={token}/>
      <Anounecement/>
      <Slide/>
      <Categories  />
      {products && <Product home={true} products={products}/>}
      {token && <NewsLetter token={token}/> }
      <Footer/>
    </div>
  )
}

export const getServerSideProps =  async(ctx)=>{
  const cookies = ctx.req?.cookies || null
  let res
  try{
   res = await axios.get('https://amarouldhamadoucheecommerce.herokuapp.com/api/product/find?new=true')
  }catch(err){}
 return{
    props:{
      token : cookies?.token || null,
      products:res?.data || {}
    }
  }
  }



