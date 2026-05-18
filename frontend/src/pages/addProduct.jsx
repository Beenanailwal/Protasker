import { useState, useEffect } from "react"
import { createProduct, updateProduct } from "../services/productApi"
import { useNavigate, useParams } from "react-router-dom"
import API from "../services/api"

export default function AddProduct() {

  const navigate = useNavigate()
  const { id } = useParams() // 👈 agar id hai = edit mode

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: ""
  })

  // 👉 EDIT MODE: data load
  useEffect(() => {
  if (id) {
    API.get(`/products/${id}`).then(res => {
      setForm({
        name: res.data.name || "",
        category: res.data.category || "",
        price: res.data.price || "",
        stock: res.data.stock || ""
      })
    })
  } else {
    setForm({
      name: "",
      category: "",
      price: "",
      stock: ""
    })
  }
}, [id])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock)
    }

    if (id) {
      // 🔥 UPDATE
      await updateProduct(id, payload)
      alert("Product Updated ✅")
    } else {
      // 🔥 CREATE
      await createProduct(payload)
      alert("Product Added ✅")
    }

    navigate("/products")
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">

      <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow">

        <h1 className="text-xl font-bold mb-4">
          {id ? "Update Product" : "Add Product"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            className={`w-full py-2 rounded text-white ${
              id ? "bg-yellow-500" : "bg-blue-600"
            }`}
          >
            {id ? "Update Product" : "Add Product"}
          </button>

        </form>

      </div>

    </div>
  )
}