import {useState} from 'react'
import { ArrowLeftOutlined,ArrowRightOutlined } from "@material-ui/icons"
import styles from '../styles/Slide.module.css'
import Image from 'next/Image'

const Slide = () => {
 const [index,setIndex] = useState(0)

 const cyrcleColor = ['crimson','teal','blue']
 const handleClick = (direction)=>{
   if(direction==="l"){
    setIndex(index>0 ? index-1 : 2)
   }else{
    setIndex(index<2 ? index+1 : 0)
   }
 }
  return (
    <div className={styles.Container}>
     <div className={styles.Arrow} direction='left' onClick={()=>handleClick('l')}>
      <ArrowLeftOutlined/>
     </div>
     <div className={styles.Wrapper} style={{ transform:`translateX(${index*-100}vw)`}}>
      <div className={styles.Slider}>
       <div className={styles.ImgContainer}>
       <div style={{position:'relative', height:'80%',width:"80%",zIndex: 9999}}>
         <Image  src="https://images.pexels.com/photos/13085604/pexels-photo-13085604.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" layout="fill" objectFit="cover"/>
         </div>
         <div className={styles.Cyrcle} style={{backgroundColor:cyrcleColor[index]}}>

         </div>
       </div>
       <div className={styles.InfoContainer}>
        <h1 className={styles.Title}>
           SUMMER SALE
        </h1>
        <div className={styles.Desc}>
            DON'T COPROMMIZE ON STYLE GET FLAT 30% OFF FOR NEW ARRIVAL
        </div>
        <button className={styles.Button}>
         Shop now!
        </button>
       </div>

      </div>
      <div className={styles.Slider}>
       <div className={styles.ImgContainer}>
         <div style={{position:'relative', height:'80%',width:"80%",zIndex: 9999}}>
         <Image className={styles.Image} src="https://images.pexels.com/photos/13085604/pexels-photo-13085604.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" layout="fill" object-fit="cover"/>
         </div>
         <div className={styles.Cyrcle} style={{backgroundColor:cyrcleColor[index]}}>

</div>
       </div>
       <div className={styles.InfoContainer}>
        <h1 className={styles.Title}>
           SUMMER SALE
        </h1>
        <div className={styles.Desc}>
            DON'T COPROMMIZE ON STYLE GET FLAT 30% OFF FOR NEW ARRIVAL
        </div>
        <button className={styles.Button}>
         Shop now!
        </button>
       </div>

      </div>
      <div className={styles.Slider}>
       <div className={styles.ImgContainer}>
       <div style={{position:'relative', height:'80%',width:"80%",zIndex: 9999}}>
         <Image className={styles.Image} src="https://images.pexels.com/photos/13085604/pexels-photo-13085604.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" layout="fill" object-fit="cover"/>
         </div>
         <div className={styles.Cyrcle} style={{backgroundColor:cyrcleColor[index]}}>

</div>
      </div>
       <div className={styles.InfoContainer}>
        <h1 className={styles.Title}>
           SUMMER SALE
        </h1>
        <div className={styles.Desc}>
            DON'T COPROMMIZE ON STYLE GET FLAT 30% OFF FOR NEW ARRIVAL
        </div>
        <button className={styles.Button}>
         Shop now!
        </button>
       </div>

      </div>
    
     </div>
     <div className={styles.Arrow} direction='right' onClick={()=>handleClick("r")}>
      <ArrowRightOutlined/>
     </div>
    </div>
  )
}

export default Slide