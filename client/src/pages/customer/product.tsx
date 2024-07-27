import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";

import FeedbackList from "@/components/feedback-list";
import FeedbackForm from "@/components/form/feedback-from";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { getProduct } from "@/http";
import { MouseEventHandler } from "react";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const cart = useCart();
  const { productId } = useParams();

  const { data, isLoading } = useQuery({
    queryFn: () => getProduct(productId!),
    queryKey: ["products", productId],
  });

  if (isLoading || !data?.data)
    return <LoaderCircle className="animate-spin" />;

  const product = data.data.product;
  const feedbacks = data.data.feedbacks;

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(product);
  };

  return (
    <div className="grid sm:grid-cols-2 gap-4 my-10">
      <div className="">
        <img src={product.image} alt="Image" className="w-96 h-96 rounded-md" />
      </div>

      <div className="w-full space-y-4">
        <p className="font-semibold text-lg">{product.name}</p>
        <p className="text-sm text-gray-500">{product.description}</p>
        <div className="flex items-center gap-4">
          <Badge>{product.category.name}</Badge>
          <Badge>{product.size}</Badge>
          <Badge>{product.color}</Badge>
        </div>
        <div className="flex items-center justify-between">
          <Badge variant="outline">NRS {product.price}</Badge>
        </div>

        <Button onClick={onAddToCart} className="w-full">
          ADD TO CART
        </Button>
      </div>

      {feedbacks.length > 0 && <FeedbackList feedbacks={feedbacks} />}
      <FeedbackForm product={productId!} />
    </div>
  );
};

export default ProductPage;
