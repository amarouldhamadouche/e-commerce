import { Badge } from "@material-ui/core";
import styles from '../styles/Navbar.module.css'
import { Search,ShoppingCartOutlined } from "@material-ui/icons"

const Navbar = () => {

  return (
    <div className={styles.Container}>
     <div className={styles.Left}>
        <div className={styles.Language}>
        EN
        </div>
       <div className={styles.SearchContainer}>
         <input className={styles.Input} placeholder="Search"/>
         <Search/>
       </div>
     </div>
     <div className={styles.Center}>
       Amar.
     </div>
     <div className={styles.Right}>
       <span className={styles.MenuItem}>Register</span>
       <span className={styles.MenuItem}>Sign in</span>
       <span className={styles.MenuItem}>
       <Badge badgeContent={4} color="secondary">
          <ShoppingCartOutlined color="action" />
       </Badge>
       </span>
     </div>
    </div>
  )
}

export default Navbar