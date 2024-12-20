
const ReviewRatingBreakdown = ({ reviews }) => {
  // Calculate the rating breakdown
  const ratingBreakdown = [5, 4, 3, 2, 1].map((rating) => {
    const count = reviews.filter((review) => review.rating === rating).length;
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
    return { rating, count, percentage };
  });

  return (
    <div className="text-gray-700">
      <p className="font-medium">Reviews</p>
      <ul className="mb-6 mt-2 space-y-2">
        {reviews.length > 0 ? (
          ratingBreakdown.map(({ rating, percentage, count }) => (
            <li
              key={rating}
              className="flex items-center text-sm font-medium text-gray-600"
            >
              <span className="w-3">{rating}</span>
              <span className="mr-4 text-yellow-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </span>
              <div className="mr-4 h-2 w-96 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full bg-yellow-400"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <span className="w-3">{count}</span>
            </li>
          ))
        ) : (
          <li className="text-gray-500">
            No reviews available yet. Be the first to leave a rating!
          </li>
        )}
      </ul>
    </div>
  );
};

export default ReviewRatingBreakdown;
