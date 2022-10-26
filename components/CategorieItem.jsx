import styles from "../styles/CategorieItem.module.css"
import Image from "next/image"
import Link from 'next/link'




export default function CategorieItem ({item})  {
  return (
    <div className={styles.Container}>
      <div style={{position:'relative',width:'100%',height:"200px"}}>
        <Image src={item?.img} alt='' layout="fill" objectFit="cover" />
      </div>
      
      <Link href={`/productList?cat=${item.name}`} passHref>
      <div className={styles.infoContainer}>
        <h1 className={styles.Title}>{item?.name}</h1>
        <button className={styles.Button}>View</button>
      </div>
      </Link>
    </div>
  )
}
