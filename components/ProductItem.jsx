/* eslint-disable */
import styles from '../styles/ProductItem.module.css'
import Image from 'next/image'
import { FavoriteBorderOutlined, SearchOutlined } from '@material-ui/icons'
import { useRouter } from 'next/router'
import { useDispatch,useSelector } from 'react-redux'
import {addToWishList,removeFromWishList} from '../redux/cartRedux'
import {useState,useEffect} from 'react'


const ProductItem = ({item}) => {
  const wishList = useSelector((state)=>state.cart.wishList)
  const dispatch = useDispatch()
  const router = useRouter()
  const [isAddedToWishList,setIsAdded] = useState()
  useEffect(()=>{
    wishList.find((p)=>p._id==item._id) ? setIsAdded(true) : setIsAdded(false)
  },[item._id,wishList])
  return (
    <div className={styles.Container}>
     <div className={styles.HeroImageContainer}>
       <Image src={item.img[0]} alt='' layout='fill' objectFit='contain'/>
    </div>
    <div className={styles.Info}>
      
       <div className={styles.Icon}>
         <SearchOutlined onClick={()=>router.push(`/product/${item._id}`)} />
       </div> 
       <div className={styles.Icon}>
         <FavoriteBorderOutlined onClick={()=>isAddedToWishList?dispatch(removeFromWishList(item)) : dispatch(addToWishList(item))} style={{color:isAddedToWishList?'red':'black'}}/>
       </div>
    </div>
   </div> 
  )
}

export default ProductItem 