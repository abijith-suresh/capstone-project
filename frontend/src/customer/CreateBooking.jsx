import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 

const CreateBooking = () => {

  const navigate = useNavigate();
  const { id } = useParams();

  // State for form data
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [specialist, setSpecialist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecialist = async () => {
      try {
        const response = await fetch(
          `http://localhost:9005/api/specialists/id/${id}`
        );
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
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the booking data based on form input
    const bookingData = {
      customerId: localStorage.getItem("userId"),
      specialistId: specialist.id,
      bookingDate: new Date().toISOString(),
      appointmentTime: `${selectedDate}T${selectedTime}:00`,
      service: selectedService,
      status: "Pending",
      price: specialist.price,
    };

    try {
      // Send a POST request to the backend to create a new booking
      const response = await fetch("http://localhost:9001/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      // Handle the response
      if (response.ok) {
        alert("Booking created successfully:", response);
        navigate(`/customer/bookings`);
        
      } else {
        console.error("Failed to create booking", response);
        alert("Something went wrong while creating the booking.");
      }
    } catch (error) {
      console.error("Error during booking submission", error);
      alert("Error creating booking. Please try again.");
    }
  };

  const isFormValid = selectedService && selectedDate && selectedTime;

  return (
    <div className="w-screen">
      {/* Header Section */}
      <div className="relative mx-auto mt-8 mb-8 max-w-screen-md overflow-hidden py-16 text-center">
        <h1 className="mt-2 px-6 text-3xl font-semibold text-gray-800 md:text-4xl">
          Create a Booking
        </h1>
        <p className="mt-4 text-base text-gray-500">
          Book an appointment with our specialists
        </p>
      </div>

      {/* Booking Form */}
      <div className="mx-auto grid max-w-screen-md px-4 pb-12">
        {/* Specialist Info Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex gap-4 items-center">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-24 w-24 sm:min-h-32 sm:w-32"
              style={{
                backgroundImage: `url(${specialist.profileImage})`,
              }}
            ></div>
            <div className="flex flex-col justify-center">
              <p className="text-lg font-semibold text-gray-800">
                {specialist.name}
              </p>
              <p className="text-sm text-gray-600">{specialist.title}</p>
              <p className="text-sm text-gray-500">{specialist.bio}</p>
            </div>
          </div>
        </div>

        {/* Select Service Section */}
        <div className="mt-6">
          <p className="text-lg font-semibold text-gray-800">
            Select a Service
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {specialist.services.map((service, index) => (
              <div key={index} className="relative group">
                <input
                  className="peer hidden"
                  id={`service_${index}`}
                  type="radio"
                  name="service"
                  value={service}
                  checked={selectedService === service}
                  onChange={(e) => setSelectedService(e.target.value)}
                />
                <label
                  className={`flex flex-col items-center justify-center border border-gray-300 rounded-lg p-4 cursor-pointer transition-all duration-300
            shadow-lg ${
              selectedService === service
                ? "bg-gray-800 text-white shadow-xl border-gray-600" // Darker border when selected
                : "bg-white text-gray-800 shadow-sm border-gray-300 hover:shadow-md hover:border-gray-400 hover:scale-105"
            } 
            active:scale-95`}
                  htmlFor={`service_${index}`}
                >
                  <span className="font-medium text-sm">{service}</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Select Date Section */}
        <div className="mt-6">
          <p className="text-lg font-semibold text-gray-800">Select a Date</p>
          <div className="relative mt-4 w-48">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
              <svg
                aria-hidden="true"
                className="h-4 w-4 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="date"
              className="datepicker-input block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-gray-800 outline-none ring-opacity-30 placeholder:text-gray-800 focus:ring focus:ring-gray-300 sm:text-sm"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        </div>

        {/* Select Time Section */}
        <div className="mt-6">
          <p className="text-lg font-semibold text-gray-800">Select a Time</p>
          <div className="mt-4 grid grid-cols-5 gap-2 lg:max-w-xl">
            {["09:00", "12:00", "15:00", "18:00", "20:00"].map(
              (time, index) => (
                <button
                  key={index}
                  className={`rounded-lg px-4 py-2 font-medium border border-gray-300 transition-all duration-300 
                ${
                  selectedTime === time
                    ? "bg-gray-800 text-white shadow-xl border-gray-600" // Darker border when selected
                    : "bg-white text-gray-800 shadow-sm border-gray-300 hover:shadow-md hover:border-gray-400 hover:scale-105"
                }
                active:scale-95`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              )
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={`w-48 rounded-full bg-emerald-600 px-8 py-3 text-lg font-semibold text-white transition-all duration-300 ${
              !isFormValid
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-emerald-700 hover:scale-105 active:scale-95 shadow-xl"
            }`}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBooking;
