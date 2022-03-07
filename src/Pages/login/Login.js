import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';

// styles
import styles from './Login.module.css'
import fireLogo from '../../img/firebase-logo.svg'
import '../../App.css'

export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isPending} = useLogin()


  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  // in javascript, you should not use the heifen (long-form) after .styles
  // otherwsie JS reads this as "styles.login MINUS form"....instead
  // surround it with brackets
  return <form onSubmit={handleSubmit} className={styles['login-form']}>
    <h2>Login</h2>
    <label>
      <span>email:</span>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
    </label>
    <label>
      <span>password:</span>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
    </label>
    {!isPending && <button className="btn">Login</button>}
    {isPending && <button className='btn' disabled>Loading</button>}
    {error && <p>{error}</p>}
    <img src={fireLogo} alt="firebase-logo" />
  </form>;

}
