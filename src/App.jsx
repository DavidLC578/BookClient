import './App.css'
import { Route, Routes } from 'react-router-dom'
import Welcome from './pages/Welcome'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './ProtectedRoute'
import Publish from './pages/Publish'
import Explore from './pages/Explore'
import BookPage from './pages/BookPage'

function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route index element={<Welcome />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/explore/:id' element={<BookPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/home' element={<Home />} />
          <Route path='/publish' element={<Publish />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
