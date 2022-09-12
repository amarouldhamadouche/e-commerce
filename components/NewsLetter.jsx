import styles from '../styles/NewsLetter.module.css'
import { Send } from "@material-ui/icons"

const NewsLetter = () => {
  return (
    <div className={styles.Container}>
     <h1 className={styles.Title}>
       NewsLetter
     </h1>
     <div className={styles.Desc}>
       Get timely update from your favorite product
     </div>
     <div className={styles.InputContainer}>
       <input placeholder='your email' className={styles.Input} type='email'/>
       <button className={styles.Button}>
          <Send/>
       </button>
     </div>
    </div>
  )
}

export default NewsLetter