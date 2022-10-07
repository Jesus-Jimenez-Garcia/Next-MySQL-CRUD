import { Layout } from "../components/Layout";
import { ProducForm } from "../components/ProducForm";

function NewPage() {
  return (
    <Layout>
      <div className="grid place-items-center h-5/6">
        <ProducForm />
      </div>
    </Layout>
  );
}

export default NewPage;
