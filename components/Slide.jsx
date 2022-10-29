import {useState} from 'react'
import { ArrowLeftOutlined,ArrowRightOutlined } from "@material-ui/icons"
import styles from '../styles/Slide.module.css'
import Image from 'next/image'

const Slide = () => {
 const [index,setIndex] = useState(0)

 const cyrcleColor = ['black','teal','pink']
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
       <div style={{position:'relative', height:'90%',width:"90%",zIndex: 9999}}>
         <Image  src="https://i.ibb.co/wLPrJ3L/My-project-2.png" alt="My-project-1"  layout="fill" objectFit="contain"/>
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
         <div style={{position:'relative', height:'90%',width:"90%",zIndex: 9999}}>
         <Image className={styles.Image} src="https://i.ibb.co/X88qsfM/My-project.png" alt="My-project-1" alt="" layout="fill" objectFit="contain"/>
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
         <Image className={styles.Image} src="https://i.ibb.co/pXvCP7T/My-project-6.png" alt="" layout="fill" object-fit="cover"/>
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