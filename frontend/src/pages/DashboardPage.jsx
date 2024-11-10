import React, { useState } from "react";
import Navbar from "../components/Navbar";

const specialists = [
  {
    id: 1,
    name: "John Doe",
    title: "Senior Developer",
    bio: "Experienced developer with over 10 years in full-stack development.",
    price: "$50/hr",
    rating: 4.5,
    imageSrc: "https://via.placeholder.com/150",
    imageAlt: "John Doe Profile Picture",
  },
  {
    id: 2,
    name: "Jane Smith",
    title: "UI/UX Designer",
    bio: "Creative designer specializing in user-centered design solutions.",
    price: "$45/hr",
    rating: 4.8,
    imageSrc: "https://via.placeholder.com/150",
    imageAlt: "Jane Smith Profile Picture",
  },
  {
    id: 3,
    name: "Bob Johnson",
    title: "Project Manager",
    bio: "Dedicated project manager with expertise in agile methodology.",
    price: "$60/hr",
    rating: 4.7,
    imageSrc: "https://via.placeholder.com/150",
    imageAlt: "Bob Johnson Profile Picture",
  },
  {
    id: 4,
    name: "Jane Smith",
    title: "UI/UX Designer",
    bio: "Creative designer specializing in user-centered design solutions.",
    price: "$45/hr",
    rating: 4.8,
    imageSrc: "https://via.placeholder.com/150",
    imageAlt: "Jane Smith Profile Picture",
  },
  {
    id: 5,
    name: "Bob Johnson",
    title: "Project Manager",
    bio: "Dedicated project manager with expertise in agile methodology.",
    price: "$60/hr",
    rating: 4.7,
    imageSrc: "https://via.placeholder.com/150",
    imageAlt: "Bob Johnson Profile Picture",
  },
];

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSpecialists, setFilteredSpecialists] = useState(specialists);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    filterSpecialists(e.target.value);
  };

  const filterSpecialists = (term) => {
    if (!term) {
      setFilteredSpecialists(specialists);
    } else {
      const filtered = specialists.filter(
        (specialist) =>
          specialist.name.toLowerCase().includes(term.toLowerCase()) ||
          specialist.title.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredSpecialists(filtered);
    }
  };

  return (
    <div className="bg-gray-50">
      <Navbar userType="customer"/>
      <div className="pt-16 px-4 sm:px-6 lg:px-8">
        {" "}
        <div className="mx-auto max-w-7xl">
          <div className="flex justify-center mb-8">
            {" "}
            <div className="relative w-full max-w-md">
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-900"
              >
                Search for Specialists
              </label>
              <div className="relative mt-3 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">🔍</span>
                </div>
                <input
                  id="search"
                  name="search"
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search by name or title"
                  className="block w-full rounded-md border-0 py-2 pl-7 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* Specialist Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredSpecialists.length > 0 ? (
              filteredSpecialists.map((specialist) => (
                <div
                  key={specialist.id}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all"
                >
                  <img
                    alt={specialist.imageAlt}
                    src={specialist.imageSrc}
                    className="h-40 w-40 object-cover rounded-full mx-auto"
                  />
                  <div className="mt-6 text-center">
                    <h3 className="text-lg font-medium text-gray-900">
                      {specialist.name}
                    </h3>
                    <p className="text-sm text-gray-500">{specialist.title}</p>
                    <p className="mt-4 text-sm text-gray-600">
                      {specialist.bio}
                    </p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-gray-900 font-medium">
                        {specialist.price}
                      </span>
                      <div className="flex items-center space-x-1 text-yellow-500">
                        {/* Star Rating */}
                        {[...Array(5)].map((_, index) => (
                          <svg
                            key={index}
                            className={`h-5 w-5 ${
                              index < specialist.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 17.75l-6.16 3.24 1.18-6.88-5-4.88 6.91-.52L12 2l2.08 6.68 6.91.52-5 4.88 1.18 6.88L12 17.75z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-4 text-center text-lg text-gray-500">
                No specialists found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
