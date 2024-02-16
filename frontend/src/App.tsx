import { RecoilRoot } from 'recoil'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Signup from '../pages/Signup.tsx'
import Signin from '../pages/Signin.tsx'


function App() {
  

 return (
    <RecoilRoot>
        <BrowserRouter>
      <Routes>
        {/* <Route path="*" element={<Navigate to="/signin" replace />} /> */}
        <Route path='/signin' element={<Signin />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        {/* <Route path='/send' element={<SendMoney />}></Route>
        <Route path='/edit' element={<EditProfile />} /> */}
      </Routes>
    </BrowserRouter>
        
    </RecoilRoot>
  
 )
}

export default App
