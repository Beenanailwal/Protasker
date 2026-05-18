import { useEffect, useState } from "react"
import { fetchTasks } from "../services/taskApi"
import { getMyOrders } from "../services/orderApi"

export default function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [orders, setOrders] = useState([])

  const loadData = async () => {
    try {
      const taskRes = await fetchTasks()
      const taskData = taskRes.data

      if (Array.isArray(taskData)) setTasks(taskData)
      else if (Array.isArray(taskData.tasks)) setTasks(taskData.tasks)
      else setTasks([])

      const orderRes = await getMyOrders()
      const orderData = orderRes

      if (Array.isArray(orderData)) setOrders(orderData)
      else if (Array.isArray(orderData.orders)) setOrders(orderData.orders)
      else setOrders([])
    } catch (err) {
      console.log(err)
      setTasks([])
      setOrders([])
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const totalTasks = tasks.length
  const pending = tasks.filter(t => t.status === "pending").length
  const inProgress = tasks.filter(t => t.status === "in-progress").length
  const completed = tasks.filter(t => t.status === "completed").length

  const totalOrders = orders.length
  const pendingOrders = orders.filter(o => o.status === "Pending").length
  const processing = orders.filter(o => o.status === "Processing").length
  const shipped = orders.filter(o => o.status === "Shipped").length
  const delivered = orders.filter(o => o.status === "Delivered").length
  const cancelled = orders.filter(o => o.status === "Cancelled").length

  const Card = ({ title, value, color }) => (
    <div className="bg-white rounded-2xl p-5 border shadow-sm hover:shadow-md transition">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className={`text-3xl font-bold mt-2 ${color}`}>{value}</h2>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 mt-2 mb-8">
          Overview of tasks and order management.
        </p>

        {/* Task Section */}
        <div className="bg-white p-6 rounded-3xl shadow-sm mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-5">Task Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            <Card title="Total Tasks" value={totalTasks} color="text-blue-600" />
            <Card title="Pending" value={pending} color="text-yellow-500" />
            <Card title="In Progress" value={inProgress} color="text-sky-600" />
            <Card title="Completed" value={completed} color="text-green-600" />
          </div>
        </div>

        {/* Order Section */}
        <div className="bg-white p-6 rounded-3xl shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-5">Order Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            <Card title="Total Orders" value={totalOrders} color="text-purple-600" />
            <Card title="Pending" value={pendingOrders} color="text-red-500" />
            <Card title="Processing" value={processing} color="text-orange-500" />
            <Card title="Shipped" value={shipped} color="text-indigo-500" />
            <Card title="Delivered" value={delivered} color="text-green-500" />
            <Card title="Cancelled" value={cancelled} color="text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  )
}