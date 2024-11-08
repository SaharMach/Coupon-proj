import { Route, HashRouter as Router, Routes, Navigate } from 'react-router-dom'
import { Home } from './pages/Home'
import { AdminPage } from './pages/AdminPage'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/admin' element={<AdminPage />} />
          
        </Routes>
      </Router>
    </>
  )

  
}

export default App
