import {BrowserRouter , Routes , Route} from "react-router-dom"
import "./App.css"
import { Signup } from './pages/signup';
import { Signin } from './pages/signin';
import { Dashboard } from './pages/dashboard';
import { SendMoney } from './components/Sendmoney';
function App() {
  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;