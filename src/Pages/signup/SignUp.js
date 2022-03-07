import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';
// styles
import styles from './SignUp.module.css'


export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  // error for password confirmation matching
  const [passErrorMsg, setPassErrorMsg] = useState('')
  // error/pending for firebase auth
  const { error, signup, isPending } = useSignup()


  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPass) {
        setPassErrorMsg('Password confirmation does not match')
        setPassword('')
        setConfirmPass('')
        // console.log('passwords dont match')
    } else {
      // setPassErrorMsg('Password matched')
      signup( email, password )
      setPassErrorMsg('')
  }
}


  return <form onSubmit={handleSubmit} className={styles['signup-form']}>
    <h2>Sign Up</h2>
    <label>
      <span>Email:</span>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
      />
    </label>
    <label>
      <span>Password:</span>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        equired
      />
    </label>
    <label>
      <span>Confirm Password:</span>
      <input
        type="password"
        onChange={(e) => setConfirmPass(e.target.value)}
        value={confirmPass}
        equired
      />
    </label>
    {!isPending && <button className="btn">Submit</button>}
    {/* if there is an error with auth or password confirmation, then this error will pop up*/}
    {error && <div>{error}</div>}
    {isPending && <button  className="btn" disabled>loading</button>}
    <div>{passErrorMsg}</div>
    <img src="./img/firebase-logo.svg" alt="firebase-logo" />
  </form>;
}
