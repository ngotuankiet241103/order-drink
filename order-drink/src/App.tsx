
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import StorePage from './pages/StorePage'
import UserPage from './pages/UserPage'
import StoreSave from './pages/StoreSave'
import OrderPage from './pages/OrderPage'
import OrderSave from './pages/OrderSave'
import DetailOrder from './pages/DetailOrder'

function App() {

  return (
    <>
       <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/stores" element={<StorePage />} />
        <Route path="/stores/new" element={<StoreSave />} />
        <Route path="/users" element={<UserPage />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/orders/new" element={<OrderSave />} />
        <Route path="/orders/detail/:order_id" element={<DetailOrder />} />
      </Routes>
    </>
  )
}

export default App
