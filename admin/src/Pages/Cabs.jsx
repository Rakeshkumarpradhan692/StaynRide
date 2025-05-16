import React, { useState } from "react";

function Cabs() {
  const [expandedRow, setExpandedRow] = useState(null);

  const cabs = [
    {
      id: 1,
      name: "City Cab",
      model: "Swift",
      price: 1200,
      address: {
        country: "India",
        state: "Odisha",
        district: "Cuttack",
        city: "Cuttack",
        pincode: "753001",
        fullAddress: "Link Road, Near Bus Stand",
      },
      createdAt: new Date(),
    },
    {
      id: 2,
      name: "Airport Taxi",
      model: "Innova",
      price: 1800,
      address: {
        country: "India",
        state: "Delhi",
        district: "New Delhi",
        city: "Delhi",
        pincode: "110001",
        fullAddress: "Airport Road, Terminal 3",
      },
      createdAt: new Date(),
    },
  ];

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="p-4 text-sm text-gray-700 font-sans">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Cab Listings</h2>
        <button
          className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-3 py-1 rounded"
          aria-label="Create New Cab"
        >
          {/* Plus icon */}
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
          Create Cab
        </button>
      </div>

      <div className="overflow-x-auto border border-gray-300 rounded">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              {/* Plus icon col on small/medium */}
              <th className="p-2 w-10 sm:table-cell md:table-cell hidden lg:hidden text-center align-middle"></th>
              <th className="p-2 text-center align-middle">Name</th>
              <th className="p-2 text-center align-middle">Model</th>
              <th className="p-2 text-center align-middle">Price</th>

              {/* Extra cols for lg+ */}
              <th className="p-2 text-center align-middle hidden lg:table-cell">
                Country
              </th>
              <th className="p-2 text-center align-middle hidden lg:table-cell">
                State
              </th>
              <th className="p-2 text-center align-middle hidden lg:table-cell">
                District
              </th>
              <th className="p-2 text-center align-middle hidden lg:table-cell">
                City
              </th>
              <th className="p-2 text-center align-middle hidden lg:table-cell">
                Pincode
              </th>
              <th className="p-2 text-center align-middle hidden lg:table-cell">
                Full Address
              </th>
              <th className="p-2 text-center align-middle hidden lg:table-cell">
                Created At
              </th>

              {/* Actions column */}
              <th className="p-2 text-center align-middle w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cabs.map((cab) => (
              <React.Fragment key={cab.id}>
                <tr className="border-b hover:bg-gray-50">
                  {/* Plus icon button for small/medium */}
                  <td className="p-2 text-center align-middle w-10 sm:table-cell md:table-cell hidden lg:hidden">
                    <button
                      onClick={() => toggleRow(cab.id)}
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

                  <td className="p-2 text-center align-middle">{cab.name}</td>
                  <td className="p-2 text-center align-middle">{cab.model}</td>
                  <td className="p-2 text-center align-middle">₹{cab.price}</td>

                  <td className="p-2 text-center align-middle hidden lg:table-cell">
                    {cab.address.country}
                  </td>
                  <td className="p-2 text-center align-middle hidden lg:table-cell">
                    {cab.address.state}
                  </td>
                  <td className="p-2 text-center align-middle hidden lg:table-cell">
                    {cab.address.district}
                  </td>
                  <td className="p-2 text-center align-middle hidden lg:table-cell">
                    {cab.address.city}
                  </td>
                  <td className="p-2 text-center align-middle hidden lg:table-cell">
                    {cab.address.pincode}
                  </td>
                  <td className="p-2 text-center align-middle hidden lg:table-cell">
                    {cab.address.fullAddress}
                  </td>
                  <td className="p-2 text-center align-middle hidden lg:table-cell">
                    {new Date(cab.createdAt).toLocaleDateString()}
                  </td>

                  {/* Actions */}
                  <td className="p-2 text-center align-middle space-x-2">
                    {/* Edit Button */}
                    <button
                      aria-label="Edit Cab"
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

                    {/* Delete Button */}
                    <button
                      aria-label="Delete Cab"
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

                {/* Expanded row only for sm/md */}
                {expandedRow === cab.id && (
                  <tr className="bg-gray-50 border-b lg:hidden">
                    <td></td>
                    <td colSpan={10} className="p-3 text-gray-700 text-center">
                      <div className="space-y-1">
                        <p>
                          <strong>Country:</strong> {cab.address.country}
                        </p>
                        <p>
                          <strong>State:</strong> {cab.address.state}
                        </p>
                        <p>
                          <strong>District:</strong> {cab.address.district}
                        </p>
                        <p>
                          <strong>City:</strong> {cab.address.city}
                        </p>
                        <p>
                          <strong>Pincode:</strong> {cab.address.pincode}
                        </p>
                        <p>
                          <strong>Full Address:</strong>{" "}
                          {cab.address.fullAddress}
                        </p>
                        <p>
                          <strong>Created At:</strong>{" "}
                          {new Date(cab.createdAt).toLocaleDateString()}
                        </p>
                      </div>
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

export default Cabs;
