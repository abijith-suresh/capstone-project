import { useNavigate } from "react-router-dom";

const SpecialistCard = ({ specialist }) => {
  const navigate = useNavigate();

  // Navigate to the specialist details page when the card is clicked
  const handleCardClick = () => {
    navigate(`/specialist/${specialist.id}`);
  };

  // Navigate to the create booking page for the selected specialist
  const handleBookNowClick = (e) => {
    e.stopPropagation();
    navigate(`/create-booking/${specialist.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
    >
      {/* Specialist Image and Rating Overlay */}
      <div className="relative">
        <img
          alt="Image of a specialist"
          src={specialist.profileImage}
          className="h-56 w-full object-cover rounded-xl"
        />

        {/* Rating Overlay */}
        <div className="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-yellow-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-slate-400 ml-1 text-sm">
            {specialist.rating}
          </span>
        </div>
      </div>

      {/* Specialist Info */}
      <div className="mt-6 text-center">
        <h3 className="text-lg font-semibold text-gray-900">
          {specialist.name}
        </h3>
        <p className="text-sm text-gray-500">{specialist.title}</p>
        <p className="mt-4 text-sm text-gray-600">{specialist.bio}</p>

        {/* Pricing and Action Button */}
        <div className="mt-4 flex justify-between items-center">
          <span className="text-gray-900 font-medium">{specialist.price}</span>
          <div
            onClick={handleBookNowClick}
            className="group inline-flex items-center rounded-xl bg-blue-600 p-2 cursor-pointer hover:bg-blue-700 transition-all duration-300 ease-in-out"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="group-hover:text-white h-5 w-5 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
            </svg>
            <span className="ml-2 text-sm text-white group-hover:text-white">
              Book Now
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialistCard;
