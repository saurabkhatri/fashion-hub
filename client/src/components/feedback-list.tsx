interface Customer {
  _id: string;
  name: string;
}

interface Feedback {
  _id: string;
  customer: Customer;
  message: string;
  ratings: number;
  createdAt: string;
}

interface FeedbackListProps {
  feedbacks: Feedback[];
}

const FeedbackList: React.FC<FeedbackListProps> = ({ feedbacks }) => {
  return (
    <div className="w-full space-y-4 my-4">
      {feedbacks.map((feedback) => (
        <div
          key={feedback._id}
          className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow"
        >
          <img
            src="https://images.pexels.com/photos/670720/pexels-photo-670720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="avatar"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h4 className="text-lg font-semibold">{feedback.customer.name}</h4>
            <div className="flex space-x-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-2xl ${
                    star <= feedback.ratings
                      ? "text-yellow-500"
                      : "text-gray-400"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <p className="text-gray-700">{feedback.message}</p>
            <p className="text-sm text-gray-500">
              {new Date(feedback.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedbackList;
