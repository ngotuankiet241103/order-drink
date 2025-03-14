
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import StorePage from './pages/StorePage'
import UserPage from './pages/UserPage'
import StoreSave from './pages/StoreSave'

function App() {

  return (
    <>
       <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/stores" element={<StorePage />} />
        <Route path="/stores/new" element={<StoreSave />} />
        <Route path="/users" element={<UserPage />} />
        <Route path="/orders" element={<UserPage />} />
      </Routes>
    </>
  )
}

export default App
