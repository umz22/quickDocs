import { Routes, Route } from 'react-router-dom';
import Home from './Pages/home/Home'
import Login from './Pages/login/Login'
import SignUp from './Pages/signup/SignUp'
import Navbar from './components/Navbar/Navbar';
import { useAuthContext } from './hooks/useAuthContext';

// styles
import './App.css';

function App() {
  const { authIsReady, user } = useAuthContext()

  return (
    <div className="App">

      {/* app.js components will not load until auth is ready */}
      {authIsReady && (
        <>
          <Navbar />
          <Routes>
            {/* home */}
            {!user && <Route path='/' element={<Login />} />}
            {user && <Route path='/' element={<Home />} />}

            {/* login */}
            {!user && <Route path='/login' element={<Login />} />}
            {user && <Route path='/login' element={<Home />} />}

            {/* signup */}
            {!user && <Route path='/signup' element={<SignUp />} />}
            {user && <Route path='/signup' element={<Home />} />}
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
