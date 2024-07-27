import { useCart } from "@/hooks/use-cart";
import { IProduct } from "@/types";
import { Plus, Trash } from "lucide-react";

const CartItem = ({ data }: { data: IProduct }) => {
  const { addItem, removeItem } = useCart();

  const onRemove = () => {
    removeItem(data._id);
  };
  const onAdd = () => {
    addItem(data);
  };
  return (
    <div className="flex items-center justify-between my-2 border-t border-b py-4">
      <img src={data.image} className="w-20 h-20 border rounded-md" />

      <div className="">
        <h3>{data.name}</h3>
        <p>quantity: {data.quantity || 0}</p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <Plus className="w-5 h-5 cursor-pointer" onClick={onAdd} />
        <Trash className="w-5 h-5 cursor-pointer" onClick={onRemove} />
      </div>
    </div>
  );
};

export default CartItem;
