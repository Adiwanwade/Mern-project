import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import SideBarNav from './shared/components/SideBarNav';
import Home from './home/pages/Home';
import UserList from './admin/users/pages/UserList';
import Login from './admin/users/pages/Login';
import { AuthContext } from './shared/context/auth-context';
import { useState, useCallback } from 'react';
import About from './pages/About';
import CreatePost from './pages/CreatePost';
import Dashboard from './pages/Dashboard';
import PostPage from './pages/PostPage';
import Search from './pages/Search';
import UpdatePost from './pages/UpdatePost';
import SignIn from './pages/SignIn';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  return (
    <div className='flex'>
      <AuthContext.Provider value={{isLoggedIn, login, logout}}>
      <Router>
        <SideBarNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/About" element={<About />} />

          <Route path="/CreatePost" element={<CreatePost />} /> <Route path="/Dashboard" element={<Dashboard/>} /> <Route path="/PostPage" element={<PostPage />} /> <Route path="/Search" element={<Search />} /> 
          <Route path="/UpdatePost" element={<UpdatePost />} />
          <Route path="/SignIn" element={<SignIn/>} />
        </Routes>        
      </Router>
      </AuthContext.Provider>
    </div>
    
  )
}

export default App