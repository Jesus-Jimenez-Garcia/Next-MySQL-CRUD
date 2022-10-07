import axios from "axios";
import { Layout } from "../../components/Layout";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

function ProductPage({ product }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      await axios.delete("/api/products/" + id);
      toast.success("Task deleted", { autoClose: 1000 });
      setTimeout(() => {
        router.push("/");
      }, "2000");
    } catch (error) {
      console.log(error.response)
      toast.error(error.response.data.message, { autoClose: 1000 });
      setTimeout(() => {
        router.push("/");
      }, "2000");
    }
  };

  return (
    <Layout>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>{product.price}</p>

      <button
        className="bg-red-400 hover:bg-red-700 text-white px-3 py-2 mr-2 rounded transition-all"
        onClick={() => handleDelete(product.id)}
      >
        delete
      </button>
      <button
        className="bg-gray-400 hover:bg-gray-700 text-white px-3 py-2 rounded transition-all"
        onClick={() => router.push("/products/edit/" + product.id)}
      >
        edit
      </button>
    </Layout>
  );
}

export const getServerSideProps = async (context) => {
  const { data: product } = await axios.get(
    "http://localhost:3000/api/products/" + context.query.id
  );

  return {
    props: { product },
  };
};
export default ProductPage;
