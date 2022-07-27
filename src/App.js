import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Card from './pages/Card';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/card' element={<Card/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
