const ReviewList = ({ reviews }) => {
  return (
    <ul className="max-w-3xl">
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <li
            key={review.reviewId}
            className="py-8 text-left border px-4 m-2 border-gray-200 rounded-lg"
          >
            <div className="flex items-start">
             
              {review.userImage ? (
                <img
                  className="block h-10 w-10 flex-shrink-0 rounded-full align-middle"
                  src={review.userImage}
                  alt={review.author}
                />
              ) : (
                <div className="block h-10 w-10 flex-shrink-0 rounded-full bg-gray-300 text-black flex items-center justify-center text-xl font-semibold">
                  {review.author.charAt(0)} 
                </div>
              )}

              <div className="ml-6">
                <div className="flex items-center">
                  {/* Render filled stars based on the rating */}
                  {Array.from({ length: 5 }, (_, index) => (
                    <svg
                      key={index}
                      className={`block h-6 w-6 align-middle ${
                        index < review.rating
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Review text */}
                <p className="mt-5 text-base text-gray-900">{review.comment}</p>

                {/* Reviewer's name and date */}
                <p className="mt-5 text-sm font-semibold text-gray-800">{review.author}</p>
                <p className="mt-1 text-sm text-gray-500">{review.createdAt}</p>
              </div>
            </div>
          </li>
        ))
      ) : (
        <li className="py-8 text-center text-gray-600">
          This specialist has no reviews.
        </li>
      )}
    </ul>
  );
};

export default ReviewList;
