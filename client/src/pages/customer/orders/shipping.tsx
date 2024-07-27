import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { updatePayment } from "@/http";

const ShippingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const queryParams = new URLSearchParams(location.search);

  const transactionId = queryParams.get("transaction_id");
  const orderId = queryParams.get("purchase_order_id");

  const { mutate } = useMutation({
    mutationFn: updatePayment,
    onSuccess: () => {
      navigate(location.pathname, { replace: true });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (err) => {
      console.log("error", err);
    },
  });

  useEffect(() => {
    if (transactionId && orderId) {
      mutate({ transactionId, orderId });
    }
  }, [transactionId, orderId, mutate]);

  return (
    <div>
      <Badge>ORDER READY FOR SHIPPING!!</Badge>
    </div>
  );
};

export default ShippingPage;
