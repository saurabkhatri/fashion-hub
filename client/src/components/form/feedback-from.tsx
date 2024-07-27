import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

import { giveFeedback } from "@/http";
import { Separator } from "@radix-ui/react-separator";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface FeedbackFormProps {
  product: string;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ product }) => {
  const [message, setMessage] = useState("");
  const [ratings, setRatings] = useState(1);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: giveFeedback,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", product] });
    },
    onError: () => {
      toast.error("ERROR WHILE GIVING FEEDBACK");
    },
  });

  const handleRating = (value: number) => {
    setRatings(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    mutation.mutate({ product, message, ratings });
  };

  return (
    <div className="w-full ">
      <Separator />
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <div>
          <Label>Message</Label>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <Label>Ratings</Label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleRating(star)}
                className={`cursor-pointer text-2xl ${
                  star <= ratings ? "text-yellow-500" : "text-gray-400"
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending && (
            <Loader2 className="animate-spin mr-2 w-4 h-4" />
          )}
          Submit Feedback
        </Button>
      </form>
    </div>
  );
};

export default FeedbackForm;
