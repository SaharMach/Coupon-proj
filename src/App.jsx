import { Route, HashRouter as Router, Routes, Navigate } from 'react-router-dom'
import { Home } from './pages/Home'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
