import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Topbar from "./Topbar.jsx"
import Welcome from './Welcome.jsx'
import Login from './Login.jsx'
import Signup from './Signup.jsx'
import Home from "./Home.jsx"
import Alltodos from "./Alltodos.jsx"
import Stickynotes from "./Stickynotes.jsx"
import Notificationsettings from "./Notificationsettings.jsx"
import Createtodo from "./Createtodo.jsx"
import Edittodo from "./Edittodo.jsx"
import Createstickynote from "./Createstickynote.jsx"
import Editstickynote from "./Editstickynote.jsx"
import './App.css'

function App() {

  return (
    <>
      <div style={{
        height : "100vh",
        width : "100vw"
      }}>
        <Router>
          <Topbar></Topbar>
          <Routes>
            <Route path='/' element = {<Welcome/>}></Route>
            <Route path='/signup' element = {<Signup/>}></Route>
            <Route path='/login' element = {<Login/>}></Route>
            <Route path='/home' element = {<Home/>}></Route>
            <Route path='/todos' element = {<Alltodos/>}></Route>
            <Route path='/stickynotes' element = {<Stickynotes/>}></Route>
            <Route path="/notificationsettings" element = {<Notificationsettings/>}></Route>
            <Route path="/createtodo" element = {<Createtodo/>}></Route>
            <Route path="/edittodo/:id" element = {<Edittodo/>}></Route>
            <Route path="/createstickynote" element = {<Createstickynote/>}></Route>
            <Route path="/editstickynote/:id" element = {<Editstickynote/>}></Route>
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App