import styles from '../styles/Login.module.css'

const Login = () => {
  return (
    <div className={styles.Container}>
     <form className={styles.Form}>
      <h1 className={styles.Title}>Sign In</h1>
      <input className={styles.Input} placeholder='Your username or email'/>
      <input className={styles.Input} placeholder='Your password' type='password'/>
      <button className={styles.Button}>Login</button>
      <div className={styles.CreateNewAcc}>CREATE A NEW ACCOUNT</div>
     </form>
    </div>
  )
}

export default Login