import React, { useState } from "react";
import { Plus, Edit, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import people from "../assets/images/people.jpg";
function Feedback() {
  const [expandedCard, setExpandedCard] = useState(null);

  const feedbacks = [
    {
      id: 1,
      image: "https://via.placeholder.com/50",
      name: "John Doe",
      email: "john@example.com",
      contact: "1234567890",
      description: "Great service and very friendly staff!",
      createdAt: new Date(),
    },
    {
      id: 2,
      image: "https://via.placeholder.com/50",
      name: "Jane Smith",
      email: "jane@example.com",
      contact: "9876543210",
      description: "Loved the quick response and professionalism.",
      createdAt: new Date(),
    },
  ];

  const toggleCard = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="p-4 font-sans text-gray-800">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Feedback List</h2>
        <button className="flex items-center gap-2 bg-gray-800 text-white hover:bg-gray-700 font-medium px-3 py-1.5 rounded-md text-sm">
          <Plus className="h-4 w-4" />
          Create Feedback
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {feedbacks.map((fb) => (
          <div
            key={fb.id}
            className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm relative"
          >
            <div className="flex gap-4 items-center mb-3">
              <img
                src={people}
                alt={`${fb.name} avatar`}
                className="w-12 h-12 border-2 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">{fb.name}</h3>
                <p className="text-sm text-gray-500">{fb.email}</p>
              </div>
            </div>

            <p className="text-sm mb-1">
              <span className="font-medium text-gray-700">Contact:</span>{" "}
              {fb.contact}
            </p>

            <div className="text-sm mb-2">
              <span className="font-medium text-gray-700">Feedback:</span>{" "}
              {expandedCard === fb.id
                ? fb.description
                : fb.description.length > 40
                ? `${fb.description.slice(0, 40)}...`
                : fb.description}
            </div>

            {fb.description.length > 40 && (
              <button
                onClick={() => toggleCard(fb.id)}
                className="text-blue-600 text-xs flex items-center gap-1"
              >
                {expandedCard === fb.id ? (
                  <>
                    Show less <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Show more <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </button>
            )}

            <div className="flex gap-3 mt-4 justify-end">
              <button className="text-gray-600 hover:text-blue-600">
                <Edit className="w-5 h-5" />
              </button>
              <button className="text-gray-600 hover:text-red-600">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feedback;
