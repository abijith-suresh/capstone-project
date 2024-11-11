import { useState } from "react";
import Navbar from "../components/Navbar";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import SpecialistCard from "../components/SpecialistCard";

export default function DashboardPage( {specialists} ) {
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
    <div className="min-h-screen">
      {/* Navbar */}
      <Navbar userType="customer" />

      {/* Main Content */}
      <div className="pt-32 pb-12 px-6 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {/* Page Title */}
          <div className="flex justify-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Find Your Perfect Specialist
            </h2>
          </div>

          {/* Search Bar */}
          <div className="flex justify-center mb-12">
            <div className="relative w-full max-w-md">
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-900"
              >
                Search for Specialists
              </label>
              <div className="relative mt-3 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="search"
                  name="search"
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search by name or title"
                  className="block w-full rounded-md border-0 py-3 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* Specialist Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredSpecialists.length > 0 ? (
              filteredSpecialists.map((specialist) => (
                <SpecialistCard key={specialist.id} specialist={specialist} />
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
