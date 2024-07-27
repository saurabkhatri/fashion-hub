import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";

import ClothesSection from "@/components/clothes/clothes-section";
import { getMensCollections } from "@/http";


const Men = () => {
  const { data, isLoading } = useQuery({
    queryFn: getMensCollections,
    queryKey: ["mens", "collections"],
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

export default Men;
