import React, { useState } from "react";

function Feedback() {
  const [expandedRow, setExpandedRow] = useState(null);
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

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="p-4 font-sans text-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Feedback List</h2>
        <button
          className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-3 py-1 rounded"
          aria-label="Create Feedback"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Create Feedback
        </button>
      </div>

      <div className="overflow-x-auto border border-gray-300 rounded">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 w-10 sm:table-cell md:table-cell hidden lg:hidden text-center align-middle"></th>
              <th className="p-2 text-center align-middle">Image</th>
              <th className="p-2 text-center align-middle">Name</th>
              <th className="p-2 text-center align-middle">Email</th>
              <th className="p-2 text-center align-middle">Contact</th>

              <th className="p-2 text-center align-middle hidden lg:table-cell">
                Description
              </th>

              <th className="p-2 text-center align-middle w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((fb) => (
              <React.Fragment key={fb.id}>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-2 text-center align-middle w-10 sm:table-cell md:table-cell hidden lg:hidden">
                    <button
                      onClick={() => toggleRow(fb.id)}
                      className="text-gray-600 hover:text-gray-900"
                      aria-label="Toggle Details"
                      style={{ cursor: "pointer" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 inline-block"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </button>
                  </td>

                  <td className="p-2 text-center align-middle">
                    <img
                      src={fb.image}
                      alt={`${fb.name} avatar`}
                      className="w-10 h-10 rounded-full object-cover mx-auto"
                    />
                  </td>
                  <td className="p-2 text-center align-middle">{fb.name}</td>
                  <td className="p-2 text-center align-middle">{fb.email}</td>
                  <td className="p-2 text-center align-middle">{fb.contact}</td>

                  <td className="p-2 text-center align-middle hidden lg:table-cell">
                    {fb.description}
                  </td>

                  <td className="p-2 text-center align-middle space-x-2">
                    <button
                      aria-label="Edit Feedback"
                      className="text-gray-600 hover:text-blue-600"
                      style={{ cursor: "pointer" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 inline-block"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.232 5.232l3.536 3.536M16.5 3.75a2.25 2.25 0 113.182 3.182L7.5 19.5H4.5v-3L16.5 3.75z"
                        />
                      </svg>
                    </button>
                    <button
                      aria-label="Delete Feedback"
                      className="text-gray-600 hover:text-red-600"
                      style={{ cursor: "pointer" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 inline-block"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>

                {expandedRow === fb.id && (
                  <tr className="bg-gray-50 border-b lg:hidden">
                    <td></td>
                    <td colSpan={6} className="p-3 text-gray-700 text-center">
                      <p>
                        <strong>Description:</strong> {fb.description}
                      </p>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Feedback;
