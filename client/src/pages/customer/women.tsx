import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";

import ClothesSection from "@/components/clothes/clothes-section";
import { getWomensCollections } from "@/http";

const Women = () => {
  const { data, isLoading } = useQuery({
    queryFn: getWomensCollections,
    queryKey: ["womens", "collections"],
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

export default Women;
