import { Routes, Route} from 'react-router-dom';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import './App.css';
import Home from './Home'; 
function App() {
  return (
    <>
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home" element={<Home />} /> 
        <Route path="/" element={<Login/>}/>
      </Routes>
    </>
  );
}

export default App;