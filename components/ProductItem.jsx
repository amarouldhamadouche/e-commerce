import styles from '../styles/ProductItem.module.css'
import Image from 'next/image'
import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@material-ui/icons'
import { useRouter } from 'next/router'
import { useDispatch,useSelector } from 'react-redux'
import {addToWishList,removeFromWishList} from '../redux/cartRedux'
import {useState,useEffect} from 'react'


const ProductItem = ({item}) => {
  const wishList = useSelector((state)=>state.cart.wishList)
  console.log(wishList,'wish')
  const dispatch = useDispatch()
  const router = useRouter()
  const [isAddedToWishList,setIsAdded] = useState()
  useEffect(()=>{
    console.log('test', wishList.findIndex((p)=>p._id==item._id) )
    wishList.find((p)=>p._id==item._id) ? setIsAdded(true) : setIsAdded(false)
  },[item._id,wishList])
  return (
    <div className={styles.Container}>
     <div className={styles.HeroImageContainer}>
       <Image src={item.img[0]} alt='' layout='fill' objectFit='contain'/>
    </div>
    <div className={styles.Info}>
      <div className={styles.Icon}>
         <ShoppingCartOutlined/>
       </div>
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