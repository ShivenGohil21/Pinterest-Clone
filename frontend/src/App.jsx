import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import { UserData } from './context/UserContext';
import { Loading } from './components/Loading';
import Navbar from './components/Navbar';
import PinPage from './pages/PinPage';

const App = () => {

const {loading, isAuth, user} = UserData();
  return (
    <>
    {loading ? (
      <Loading />

    ) : (
      <BrowserRouter>
      {isAuth && <Navbar/>}
      <Routes>
        <Route path="/" element={isAuth ? <Home /> : <Login />} />
        <Route path="/pin/:id" element={isAuth ? <PinPage user={user} /> : <Login />} />
        <Route path="/login" element={isAuth ? <Home /> : <Login />} />
        <Route path="/register" element={isAuth ? <Home />: <Register />} />
      </Routes>
    </BrowserRouter>
    )}
    </>
    
  );
}

export default App;

