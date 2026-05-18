import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Tasks from "./pages/Tasks"
import Products from "./pages/Products"
import CreateOrder from "./pages/CreateOrder"
import MyOrders from "./pages/MyOrders"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import { useState, useEffect } from "react"
import AddProduct from "./pages/AddProduct"
import Profile from "./pages/Profile"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token)
  }, [])

  return (
    <BrowserRouter>

    
  {isLoggedIn && (
    <Sidebar
  sidebarOpen={sidebarOpen}
  setSidebarOpen={setSidebarOpen}
/>
  )}

  {/* Navbar */}
      {isLoggedIn && (
        <Navbar
          setIsLoggedIn={setIsLoggedIn}
        />
      )}

      {/* Main Content */}
      <main className={`pt-16 transition-all duration-300 ${
  sidebarOpen ? "ml-60" : "ml-16"
}`}>
        <div className="p-6">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/tasks"
              element={
                <ProtectedRoute>
                  <Tasks />
                </ProtectedRoute>
              }
            />

            <Route
  path="/products"
  element={
    <ProtectedRoute>
      <Products />
    </ProtectedRoute>
  }
/>

<Route
  path="/create-order"
  element={
    <ProtectedRoute>
      <CreateOrder />
    </ProtectedRoute>
  }
/>

<Route
  path="/my-orders"
  element={
    <ProtectedRoute>
      <MyOrders />
    </ProtectedRoute>
  }
/>

<Route
  path="/add-product"
  element={<AddProduct key="add" />}
/>

<Route
  path="/edit-product/:id"
  element={<AddProduct key="edit" />} // 👈 same page reuse
/>

            <Route
              path="/login"
              element={<Login setIsLoggedIn={setIsLoggedIn} />}
            />

            <Route path="/register" element={<Register />} />
<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>
            <Route
              path="*"
              element={
                <ProtectedRoute>
                  <NotFound />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </main>

    </BrowserRouter>
  )
}

export default App