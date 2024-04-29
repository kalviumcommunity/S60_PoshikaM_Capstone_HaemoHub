import './App.css'
import { Route, Routes } from "react-router-dom"
import Signup from './Components/Signup'
import Navbar from './Components/Navbar'
import Login from './Components/Login'
import DonorSignup from './Components/DonorSignup'
import DonorLogin from './Components/DonorLogin'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Navbar/>} ></Route>
        <Route path='/signup' element={<Signup/> } ></Route>
        <Route path='/login' element={<Login/> } ></Route>
        <Route path='/donorSignup' element={<DonorSignup/>} ></Route>
        <Route path='/donorLogin' element={<DonorLogin/>} ></Route>
      </Routes>
    </div>
  )
}

export default App;