import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export const SpecialistDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [specialist, setSpecialist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecialist = async () => {
      try {
        const response = await fetch(`http://localhost:5000/specialist/${id}`);
        if (response.ok) {
          const data = await response.json();
          setSpecialist(data);
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
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!specialist) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center text-red-500">
        Specialist not found
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6 sm:px-8 lg:px-16">
      <Navbar userType="customer" />
      <div className="max-w-7xl mx-auto">
        {/* Specialist Info Section */}
        <div className="bg-white p-8">
          <div className="flex p-4 container">
            <div className="flex w-full flex-col gap-4 items-start">
              <div className="flex gap-4 flex-col items-start">
                {/* Profile Image */}
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32"
                  style={{
                    backgroundImage: `url(${specialist.profileImage})`,
                  }}
                ></div>
                <div className="flex flex-col justify-center">
                  {/* Specialist Name and Rating */}
                  <p className="text-[22px] font-bold leading-tight tracking-[-0.015em]">
                    {specialist.name}, {specialist.rating}
                  </p>
                  <p className="text-base font-normal leading-normal">
                    {specialist.title}, {specialist.experience} years experience
                  </p>
                </div>
              </div>
              <div className="flex w-full max-w-[480px] gap-3 sm:w-auto">
                {/* Book Button */}
                <button
                  onClick={() => navigate(`/create-booking/${specialist.id}`)}
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-blue-600 text-white text-sm font-bold leading-normal tracking-[0.015em] flex-1 sm:flex-auto transition-all duration-300 hover:bg-blue-700 hover:scale-105 active:scale-95 shadow-lg"
                >
                  <span className="truncate">Book</span>
                </button>
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="mt-8">
            <h2 className=" text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Services
            </h2>
            <div className="flex gap-3 p-3 flex-wrap pr-4">
              {specialist.services.map((service, index) => (
                <div
                  key={index}
                  className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#293038] pl-4 pr-4"
                >
                  <p className="text-white text-sm font-medium leading-normal">
                    {service}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              About me
            </h2>
            <p className="text-base font-normal leading-normal pb-3 pt-1 px-4">
              {specialist.bio}
            </p>
          </div>

          {/* Photos Section */}
          <div className="mt-12">
            <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
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
        </div>
      </div>
    </div>
  );
};

export default SpecialistDetailsPage;
