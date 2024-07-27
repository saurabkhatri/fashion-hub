import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IBillboard, IProduct } from "@/types";
import { useState } from "react";
import ProductCard from "../product-card";

const ClothesSection = ({
  billboard,
  products,
}: {
  billboard: IBillboard;
  products: IProduct[];
}) => {
  const [sortOption, setSortOption] = useState("price-low-to-high");

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "price-low-to-high") {
      return a.price - b.price;
    } else if (sortOption === "price-high-to-low") {
      return b.price - a.price;
    } else {
      return 0;
    }
  });

  return (
    <div className="w-full h-full">
      <div className="relative">
        <div className="w-full h-[26rem]">
          <img
            src={billboard.image}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute top-1/2 right-16 sm:bottom-20 sm:right-1/3 text-center">
            <p className="text-xs sm:text-base text-white">{billboard.title}</p>
            <h2 className="text-xs sm:text-4xl text-white font-semibold">
              {billboard.description}
            </h2>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end my-4">
        <Select
          onValueChange={(value) => setSortOption(value)}
          defaultValue="price-low-to-high"
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue
              placeholder="Sort by"
              defaultValue="price-low-to-high"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="price-low-to-high">
                Price (low to high)
              </SelectItem>
              <SelectItem value="price-high-to-low">
                Price (high to low)
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {sortedProducts.map((p) => (
          <ProductCard key={p._id} data={p} />
        ))}
      </div>
    </div>
  );
};

export default ClothesSection;
