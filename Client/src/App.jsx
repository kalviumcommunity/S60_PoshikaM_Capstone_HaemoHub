import './App.css'
import { Route, Routes } from "react-router-dom"
import Signup from './Components/Signup'
import Login from './Components/Login'
import DonorSignup from './Components/DonorSignup'
import DonorLogin from './Components/DonorLogin'
import SearchStock from './Components/SearchStock'
import About from './Components/About'
import BloodBankSignup from './Components/BloodbankSignup'
import Navbar from './Components/Navbar'
import BloodBankLogin from './Components/BloodBankLogin'
import { UserContextProvider } from './Components/UserContext'
import BloodStockUpdate from './Components/BloodStockUpdate'
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <div>
      <UserContextProvider>
      {/* <Navbar/> */}
      <Toaster/>
      <Routes>
        <Route path='/' element={<SearchStock/>} ></Route>
        <Route path='/signup' element={<Signup/> } ></Route>
        <Route path='/Login' element={<Login/> } ></Route>
        <Route path='/DonorSignup' element={<DonorSignup/>} ></Route>
        <Route path='/DonorLogin' element={<DonorLogin/>} ></Route>
        <Route path='/AboutUs' element={<About/>}></Route>
        <Route path='/BloodBankSignup' element={<BloodBankSignup/>}></Route>
        <Route path='/BloodBankLogin' element={<BloodBankLogin/>}></Route>
        <Route path='/BloodStockUpdate' element={<BloodStockUpdate/>}></Route>
        <Route path='*' element={<SearchStock/>}></Route>
      </Routes>
      </UserContextProvider>
    </div>
  )
}

export default App;