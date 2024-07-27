import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";

import ClothesSection from "@/components/clothes/clothes-section";
import { getSummerCollections } from "@/http";

const Summer = () => {
  const { data, isLoading } = useQuery({
    queryFn: getSummerCollections,
    queryKey: ["summer", "collections"],
  });

  if (isLoading) return <LoaderCircle className="animate-spin" />;

  return (
    <>
      <ClothesSection
        billboard={data?.data.billboard}
        products={data?.data.products}
      />
    </>
  );
};

export default Summer;
