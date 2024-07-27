import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useParams } from "react-router-dom";

import EditProductForm from "@/components/form/edit-product-form";
import { getProduct } from "@/http";

const EditProductPage = () => {
  const { productId } = useParams();

  const { data, isLoading } = useQuery({
    queryFn: () => getProduct(productId!),
    queryKey: ["products", productId],
  });

  if (isLoading || !data?.data)
    return <LoaderCircle className="animate-spin" />;

  const product = data.data.product;

  return (
    <div className="">
      <EditProductForm product={product} />
    </div>
  );
};

export default EditProductPage;
