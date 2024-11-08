import { Route, HashRouter as Router, Routes, Navigate } from 'react-router-dom'
import { Home } from './pages/Home'
import { AdminPage } from './pages/AdminPage'
import { Login } from './pages/Login'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/admin' element={<AdminPage />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </>
  )

  
}

export default App
