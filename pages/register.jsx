import styles from '../styles/Register.module.css'

const Register = () => {
  return (
   <div className={styles.Container}>
   <form className={styles.Form}>
    <h1 className={styles.Title}>Sign Up</h1>
    <div className={styles.InputContainer}>
      <input className={styles.Input} placeholder='Name'/>
      <input className={styles.Input} placeholder='Last Name' />
      <input className={styles.Input} placeholder='Username'/>
      <input className={styles.Input} placeholder='Email' type='email'/>
      <input className={styles.Input} placeholder='Password' type='password'/>
      <input className={styles.Input} placeholder='Confirm Password' type='password'/>
     </div>
     <div className={styles.Agreement}>BY CREATING AN ACCOUNT I CONSENT TO THE PROCESSING OF MY PERSONAL DATA IN ACCORDANCE WITH THE <b>PRIVACY POLICY</b></div>
    <button className={styles.Button}>CREATE</button>
   
   </form>
  </div>
  )
}

export default Register