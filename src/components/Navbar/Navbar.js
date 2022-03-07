import { Link } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';

// styles
import navStyles from './Navbar.module.css'

export default function Navbar() {
  const { logout } = useLogout()
  // this user useState is grabbed from AuthContext.js via useAuthContext.js
  const { user } = useAuthContext()


  return <nav className={navStyles.navbar}>
    <ul>
      <li className={navStyles.title}><Link to='/'>quickDocs</Link></li>
      {/* <li><Link to='/'>Home</Link></li> */}
      {/* if there is not a user, then show the following: */}
      {!user && (
        <>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/signup'>Sign Up</Link></li>
        </>
      )}

      {/* is there is a user logged in, then show the following: */}
      {user && (
        <>
          <li>
            <button className='logout-btn' onClick={logout}>Logout</button>
          </li>
        </>)}

      </ul>
  </nav>;
}
