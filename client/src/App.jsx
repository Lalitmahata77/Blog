import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Signin from "./components/auth/Signin"
import Signup from "./components/auth/Signup"
import About from "./pages/About"
import Dashboard from "./pages/Dashboard"
import Header from "./components/Header"
import Project from "./pages/Project"
import Footer from "./components/Footer"
function App() {
 
  return (
   <BrowserRouter>
   <Header/>
   <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/signin" element={<Signin/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/project" element={<Project/>}/>
   </Routes>
   <Footer/>
   </BrowserRouter>
  )
}

export default App
