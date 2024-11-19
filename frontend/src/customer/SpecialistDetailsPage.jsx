import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import Navbar from "../components/Navbar";
import ReviewList from "../components/ReviewList";
import ReviewRatingBreakdown from "../components/ReviewRatingBreakdown";

export const SpecialistDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [specialist, setSpecialist] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the specialist details and reviews
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

          // Fetch reviews separately from another service if needed
          const reviewsResponse = await fetch(
            `http://localhost:9005/api/specialists/${id}/reviews`
          );
          if (reviewsResponse.ok) {
            const reviewsData = await reviewsResponse.json();
            setReviews(reviewsData);
          } else {
            console.error("Failed to fetch reviews");
          }
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

  // Calculate the average rating dynamically from reviews
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;

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
                  className={`bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32 flex items-center justify-center text-white text-5xl font-bold ${
                    specialist.profileImage ? "" : "bg-gray-400"
                  }`}
                  style={{
                    backgroundImage: specialist.profileImage
                      ? `url(${specialist.profileImage})`
                      : "none",
                  }}
                >
                  {!specialist.profileImage && specialist.name ? (
                    <span>{specialist.name[0]}</span>
                  ) : null}
                </div>

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
              {specialist.photos && specialist.photos.length > 0 ? (
                specialist.photos.map((photo, index) => (
                  <div key={index} className="flex flex-col gap-3">
                    <div
                      className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                      style={{ backgroundImage: `url(${photo})` }}
                    ></div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No photos available</p>
              )}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="my-10 max-w-screen-md px-10 py-16 bg-gray-50 rounded-xl shadow-sm">
            <div className="flex w-full flex-col">
              <div className="flex flex-col sm:flex-row">
                <h1 className="max-w-sm text-3xl font-semibold text-gray-800">
                  What people think about {specialist.name}
                </h1>
                <div className="my-4 rounded-xl bg-white py-2 px-4 shadow sm:my-0 sm:ml-auto">
                  <div className="flex h-16 items-center text-2xl font-semibold text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-yellow-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />{" "}
                    </svg>
                    <span className="ml-2 text-xl">
                      {reviews.length > 0 ? averageRating.toFixed(1) : "0.0"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">Average User Rating</p>
                </div>
              </div>

              <ReviewRatingBreakdown reviews={reviews} />
            </div>
            <ReviewList reviews={reviews} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialistDetailsPage;
