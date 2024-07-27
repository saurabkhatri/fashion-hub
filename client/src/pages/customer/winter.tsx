import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";

import ClothesSection from "@/components/clothes/clothes-section";
import { getWinterCollections } from "@/http";

const Winter = () => {
  const { data, isLoading } = useQuery({
    queryFn: getWinterCollections,
    queryKey: ["winter", "collections"],
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

export default Winter;
