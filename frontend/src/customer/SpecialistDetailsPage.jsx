import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import Navbar from "../components/Navbar";

export const SpecialistDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [specialist, setSpecialist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecialist = async () => {
      try {
        const response = await fetch(
          `http://localhost:9002/api/customer/specialist/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          const updatedSpecialist = { ...data, reviews: data.reviews || [] };
          setSpecialist(updatedSpecialist);
        } else {
          console.error("Specialist not found");
        }
      } catch (error) {
        console.error("Error fetching specialist details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialist();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!specialist) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center text-red-500">
        Specialist not found
      </div>
    );
  }

  const { reviews } = specialist;

  // Calculate the average rating dynamically
  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  // Calculate the rating breakdown (how many 1-star, 2-star, etc.)
  const ratingBreakdown = [5, 4, 3, 2, 1].map((rating) => {
    const count = reviews.filter((review) => review.rating === rating).length;
    const percentage = (count / reviews.length) * 100;
    return { rating, count, percentage };
  });

  return (
    <div className="min-h-screen py-12 px-6 sm:px-8 lg:px-16">
      <Navbar userType="customer" />
      <div className="max-w-7xl mx-auto">
        {/* Specialist Info Section */}
        <div className="bg-white p-8 shadow-sm rounded-xl">
          <div className="flex p-4 container">
            <div className="flex w-full flex-col gap-4 items-start">
              <div className="flex gap-4 flex-col">
                {/* Profile Image */}
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32"
                  style={{
                    backgroundImage: `url(${specialist.profileImage})`,
                  }}
                ></div>
                <div className="flex flex-col justify-center">
                  {/* Specialist Name and Rating */}
                  <p className="text-[22px] font-bold leading-tight tracking-[-0.015em] text-gray-800">
                    {specialist.name}
                  </p>
                  <p className="text-base font-normal leading-normal text-gray-600">
                    {specialist.title}, {specialist.experience} years experience
                  </p>
                </div>
              </div>
              <div className="flex w-full max-w-[480px] gap-3 sm:w-auto">
                {/* Book Button */}
                <button
                  onClick={() =>
                    navigate(`/customer/create-booking/${specialist.id}`)
                  }
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-emerald-600 text-white text-sm font-bold leading-normal tracking-[0.015em] flex-1 sm:flex-auto transition-all duration-300 hover:bg-emerald-700 hover:scale-105 active:scale-95 shadow-lg"
                >
                  <span className="truncate">Book</span>
                </button>
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="mt-8">
            <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-gray-800">
              Services
            </h2>
            <div className="flex gap-3 p-3 flex-wrap pr-4">
              {specialist.services.map((service, index) => (
                <div
                  key={index}
                  className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-gray-200 pl-4 pr-4"
                >
                  <p className="text-gray-800 text-sm font-medium leading-normal">
                    {service}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-gray-800">
              About me
            </h2>
            <p className="text-base font-normal leading-normal pb-3 pt-1 px-4 text-gray-700">
              {specialist.bio}
            </p>
          </div>

          {/* Photos Section */}
          <div className="mt-12">
            <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-gray-800">
              Photos
            </h2>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {specialist.photos.map((photo, index) => (
                <div key={index} className="flex flex-col gap-3">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                    style={{ backgroundImage: `url(${photo})` }}
                  ></div>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="my-10 max-w-screen-md px-10 py-16 bg-gray-50 rounded-xl shadow-sm">
            <div className="flex w-full flex-col">
              <div className="flex flex-col sm:flex-row">
                <h1 className="max-w-sm text-3xl font-bold text-gray-800">
                  What people think about {specialist.name}
                </h1>
                <div className="my-4 rounded-xl bg-white py-2 px-4 shadow sm:my-0 sm:ml-auto">
                  <div className="flex h-16 items-center text-2xl font-bold text-blue-900">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-yellow-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {averageRating.toFixed(1)}
                  </div>
                  <p className="text-sm text-gray-500">Average User Rating</p>
                </div>
              </div>

              <div className="text-gray-700">
                <p className="font-medium">Reviews</p>
                <ul className="mb-6 mt-2 space-y-2">
                  {ratingBreakdown.map(({ rating, percentage, count }) => (
                    <li
                      key={rating}
                      className="flex items-center text-sm font-medium text-gray-700"
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
                      <div className="mr-4 h-2 w-96 overflow-hidden rounded-full bg-gray-300">
                        <div
                          className={`h-full bg-yellow-400`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="w-3">{count}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <ul className="max-w-3xl">
            {reviews.map((review) => (
              <li
                key={review.id}
                className="py-8 text-left border px-4 m-2 border-gray-200 rounded-lg"
              >
                <div className="flex items-start">
                  <img
                    className="block h-10 w-10 flex-shrink-0 rounded-full align-middle"
                    src={review.userImage}
                    alt={review.author}
                  />

                  <div className="ml-6">
                    <div className="flex items-center">
                      {/* Render filled stars based on the rating */}
                      {Array.from({ length: 5 }, (_, index) => (
                        <svg
                          key={index}
                          className={`block h-6 w-6 align-middle ${
                            index < review.rating
                              ? "text-yellow-500"
                              : "text-gray-400"
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
                    <p className="mt-5 text-base text-gray-900">
                      {review.comment}
                    </p>

                    {/* Reviewer's name and date */}
                    <p className="mt-5 text-sm font-bold text-gray-900">
                      {review.author}
                    </p>
                    <p className="mt-1 text-sm text-gray-600">{review.date}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SpecialistDetailsPage;
