import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export function ProducForm() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (router.query.id) {
        await axios.put(`/api/products/${router.query.id}`, product);
        toast.success("Product updated successfully", { autoClose: 1000 });
      } else {
        await axios.post("api/products", product);
        toast.success("Product created successfully", { autoClose: 1000 });
      }
      setTimeout(() => {
        router.push("/");
      }, "2000");
    } catch (error) {
      toast.error(error.response.data.message, { autoClose: 1000 });
    }
  };

  const handleChange = ({ target: { name, value } }) =>
    setProduct({ ...product, [name]: value });

  useEffect(() => {
    const getProduct = async () => {
      const { data } = await axios.get(`/api/products/${router.query.id}`);
      setProduct(data);
    };

    if (router.query.id) {
      getProduct(router.query.id);
    }
  }, []);

  return (
    <div className="w-full max-w-xs">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name:
          </label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={product.name}
            className="shadow appearance-none border w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)]"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Price:
          </label>
          <input
            type="number"
            step="500"
            name="price"
            id="price"
            onChange={handleChange}
            value={product.price}
            className="shadow appearance-none border w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)]"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description:
          </label>
          <textarea
            name="description"
            rows="2"
            onChange={handleChange}
            value={product.description}
            className="shadow appearance-none border w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)]"
          ></textarea>
        </div>

        <button className="bg-blue-500 hover:bg-blue-700 y-2 px-4 rounded focus:outline-none focus:shadow-inner font-bold text-white">
          {router.query.id ? "Update product" : "Save product"}
        </button>
      </form>
    </div>
  );
}
