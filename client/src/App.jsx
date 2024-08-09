import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Home } from './pages/home'
import { Auth } from './pages/auth'
import { Createrecipe } from './pages/create-recei'
import { SavedRecipe } from './pages/saved-recipes'
import { Navbar } from './Components/Navbar'
function App() {
  return (
    <>
     <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/savedrecipe' element={<SavedRecipe/>}/>
        <Route path='/createrecipe' element={<Createrecipe/>}/>     
      </Routes>
     </Router>
    </>
  )
}

export default App
