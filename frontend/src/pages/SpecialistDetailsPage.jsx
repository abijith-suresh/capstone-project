import { useParams } from "react-router-dom";

const SpecialistDetailsPage = ({ specialists }) => {
  const { id } = useParams();
  const specialist = specialists.find((spec) => spec.id === id);

  if (!specialist) {
    return <div>Specialist not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Specialist Details */}
      <h2 className="text-3xl font-bold text-gray-900">{specialist.name}</h2>
      <p className="text-xl text-gray-700">{specialist.title}</p>
      <img
        src={specialist.imageSrc}
        alt={specialist.imageAlt}
        className="w-full h-64 object-cover rounded-xl mt-4"
      />
      <p className="mt-4 text-gray-600">{specialist.bio}</p>
      <p className="mt-4 text-xl font-medium">{specialist.price}</p>
      <p className="mt-2 text-gray-500">Rating: {specialist.rating}</p>
    </div>
  );
};

export default SpecialistDetailsPage;
