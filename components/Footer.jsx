import { Facebook, Instagram, Mail, Phone, Room, Twitter } from '@material-ui/icons'
import styles from'../styles/Footer.module.css'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className={styles.Container}>
      <div className={styles.Item}>
       <h1 className={styles.Title}>
        Amar.
       </h1>
       <div className={styles.Desc}>
        there are many there are many there are many there are many there are many there are many there are many there are many there are many there are many there are many there are many there are many
       </div>
       <div className={styles.SocialLinks}>
        <Link href={"https://www.facebook.com/profile.php?id=100007073805383"} passHref>
       <div className={styles.Cyrcle}>
        <Facebook/>
       </div>
       </Link>
       <div className={styles.Cyrcle}>
        <Instagram/>
       </div>
       <div className={styles.Cyrcle}>
        <Twitter/>
       </div>
       </div>
      </div>
      <div className={styles.Item}>
       <h1 className={styles.SubTitle}>
        Usefull Links
       </h1>
       <ul className={styles.Ul}>
        <li className={styles.Li}>
         Home
        </li>
        <li className={styles.Li}>
         Cart
        </li>
        <li className={styles.Li}>
         Man Fashion
        </li>
        <li className={styles.Li}>
         Woman Fashion
        </li>
        <li className={styles.Li}>
         Accessoires
        </li>
        <li className={styles.Li}>
         My Account
        </li>
        <li className={styles.Li}>
         Order Tracking
        </li>
        <li className={styles.Li}>
         Wishlist
        </li>
        <li className={styles.Li}>
         Wishlist
        </li>
        <li className={styles.Li}>
         Terms
        </li>
       </ul>
      </div>
      <div className={styles.Item}>
       <h1 className={styles.SubTitle}>
        Contact
       </h1>
       <div className={styles.ContactItem}>
        <Room style={{marginRight:'10px'}} /> Cité 1900, Tiret, Algeria
       </div>
       <div className={styles.ContactItem}>
        <Phone style={{marginRight:'10px'}}/> +213540925082
       </div>
       <div className={styles.ContactItem}>
        <Mail style={{marginRight:'10px'}}/> Amarouldhamadouche0@gmail.com
       </div>
        <Image src='https://i.ibb.co/Qfvn4z6/payemant.png' alt='' width='250' height='100'  objectFit='contain' style={{cursor:'pointer'}} />
      </div>
    </div>
  )
}

export default Footer