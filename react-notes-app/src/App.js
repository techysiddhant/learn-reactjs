
import { Routes, Route} from 'react-router-dom';
import './App.css';

import Header from './components/Header';
// import Login from './pages/Login';
import NotePage from './pages/NotePage';
import NotesListPage from './pages/NotesListPage';
import {onAuthStateChanged, getAuth, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth'; 
import { app } from './firebase';
import { useEffect, useState } from 'react';
const auth = getAuth(app);
const loginHandler = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth,provider);
}
const logoutHandler = ()=>{
  signOut(auth);
}
const HeaderLogin = () => {
  return (
    <div className='app-header'>
        <h1>Notes List</h1>
        <button onClick={loginHandler}>Log in With google</button>
    </div>
  )
}
function App() {
  const [user,setUser] = useState(false);
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,(data)=>{
      setUser(data);
      // console.log(data)
    });
    return ()=>{
      unsubscribe();
    }
  },[]);

  return (
    <div className="container dark">
      
      <div className='app '>
        {
          user ? (
            <>
              <Header logoutHandler={logoutHandler} />
            <Routes>
              <Route path='/' element={<NotesListPage/>} />
              <Route path='/note/:id' element={<NotePage/>} />
            </Routes>
            </>
          ):<HeaderLogin />
        }
      
       
      </div>
      
    </div>
  );
}

export default App;
