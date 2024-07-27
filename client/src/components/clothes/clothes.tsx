import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Product = {
  id: number;
  title: string;
  price: number;
  images: string[];
};

type Collection = {
  coverImage: string;
  title: string;
  description: string;
  products: Product[];
};

const Clothes = ({ clothes }: { clothes: Collection }) => {
  return (
    <div className="w-full h-full">
      <div className="relative">
        <img src={clothes.coverImage} alt="" className="bg-blend-overlay" />
        <div className="absolute bottom-20 right-1/3 text-center">
          <p className="text-base text-white">{clothes.title}</p>
          <h2 className="text-4xl text-white font-semibold">
            {clothes.description}
          </h2>
        </div>
      </div>

      <div className="flex items-center justify-end my-4">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="price-low-to-high">
                Price (low to high)
              </SelectItem>
              <SelectItem value="price-high-to-low">
                Price (hight to low)
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {clothes.products.map((p) => (
          <div key={p.id}>
            <img src={p.images[0]} alt="" />
            <p className="font-bold">{p.title}</p>
            <p>NRS {p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clothes;
