import styles from "../styles/CategorieItem.module.css"
import Image from "next/image"




const CategorieItem = ({item}) => {
  return (
    <div className={styles.Container}>
      <div style={{position:'relative',width:'100%',height:"200px"}}>
        <Image src={item.img} alt='' layout="fill" objectFit="cover" />
      </div>
      <div className={styles.infoContainer}>
        <h1 className={styles.Title}>{item.title}</h1>
        <div className={styles.Desc}>fgnjsdnksndknsd nksdjdsknknjds knd ksjdnsdjn </div>
        <button className={styles.Button}>Detail</button>
      </div>
    </div>
  )
}

export default CategorieItem