import { useEffect, useState } from "react"
import { getMyOrders, cancelOrder, updateOrderStatus } from "../services/orderApi"

function MyOrders() {

  const [orders, setOrders] = useState([])

  const isAdmin = localStorage.getItem("role") === "admin"

const loadOrders = async () => {
  const data = await getMyOrders()
  setOrders(data)
}

const handleStatusChange = async (id, status) => {
  await updateOrderStatus(id, status)
  loadOrders()
}

  useEffect(() => {
  loadOrders()
}, [])

  const handleCancel = async (id) => {
    const ok = confirm("Cancel this order?")
    if (!ok) return

    await cancelOrder(id)

    const data = await getMyOrders()
    setOrders(data)
  }

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">

  <h1 className="text-xl md:text-2xl font-bold mb-6">📦 My Orders</h1>

  {orders.length === 0 && (
    <p className="text-gray-500 text-center">No orders yet</p>
  )}

  {orders.map(order => (

    <div
      key={order._id}
      className="bg-white border rounded-xl p-4 mb-4 shadow-sm hover:shadow-md transition"
    >

      {/* TOP */}
      <div className="flex justify-between items-center mb-4">

        <div>
          <p className="text-sm text-gray-500">
            Order #{order._id.slice(-6)}
          </p>

          <p className="text-xs text-gray-400">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* STATUS BADGE */}
        {/* STATUS BADGE */}
{isAdmin ? (
  <select
    value={order.status}
    onChange={(e) => handleStatusChange(order._id, e.target.value)}
    className={`px-3 py-1 text-xs font-medium rounded-full border-0 outline-none ${
      order.status === "Delivered"
        ? "bg-green-100 text-green-700"
        : order.status === "Processing"
        ? "bg-blue-100 text-blue-700"
        : order.status === "Shipped"
        ? "bg-purple-100 text-purple-700"
        : order.status === "Cancelled"
        ? "bg-red-100 text-red-700"
        : "bg-yellow-100 text-yellow-700"
    }`}
  >
    <option>Pending</option>
    <option>Processing</option>
    <option>Shipped</option>
    <option>Delivered</option>
    <option>Cancelled</option>
  </select>
) : (
  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
    order.status === "Delivered"
      ? "bg-green-100 text-green-700"
      : order.status === "Processing"
      ? "bg-blue-100 text-blue-700"
      : order.status === "Shipped"
      ? "bg-purple-100 text-purple-700"
      : order.status === "Cancelled"
      ? "bg-red-100 text-red-700"
      : "bg-yellow-100 text-yellow-700"
  }`}>
    {order.status}
  </span>
)}

      </div>

      {/* 🔥 ORDER TIMELINE */}
      <div className="flex items-center justify-between text-xs mb-3">

        {["Pending", "Processing", "Shipped", "Delivered"].map((step, i) => {

          const isActive =
            ["Pending", "Processing", "Shipped", "Delivered"].indexOf(order.status) >= i

          return (
            <div key={i} className="flex-1 text-center">

              <div className={`w-5 h-5 mx-auto rounded-full ${
                isActive ? "bg-green-500" : "bg-gray-300"
              }`} />

              <p className="mt-1">{step}</p>

            </div>
          )
        })}

      </div>

      {/* PRODUCTS */}
      <div className="border-t pt-3">

        {order.products.map((p, i) => (
  <div key={i} className="flex justify-between text-sm mb-2">
    <div>
      <p className="font-medium">{p.product?.name}</p>
      <p className="text-xs text-gray-500">
        ₹{p.product?.price} × {p.quantity}
      </p>
    </div>

    <p className="font-medium text-gray-700">
      ₹{p.product?.price * p.quantity}
    </p>
  </div>
))}

      </div>

      {/* TOTAL */}
      <div className="border-t mt-3 pt-3 flex justify-between items-center">

  <div className="font-semibold">
    Total Amount: ₹{order.totalAmount}
  </div>

  {order.status !== "Cancelled" && order.status !== "Delivered" && (
    <button
      onClick={() => handleCancel(order._id)}
      className="mt-3 text-red-500 text-sm hover:underline"
    >
      Cancel Order
    </button>
  )}

</div>

      {/* CANCEL BUTTON
      {order.status !== "Cancelled" && order.status !== "Delivered" && (
        <button
          onClick={() => handleCancel(order._id)}
          className="mt-3 text-red-500 text-sm hover:underline"
        >
          Cancel Order
        </button>
      )} */}

    </div>

  ))}

</div>
  )
}

export default MyOrders