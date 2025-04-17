
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './screens/Home'
import Submit from './screens/Submit'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/submit' element={<Submit />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
