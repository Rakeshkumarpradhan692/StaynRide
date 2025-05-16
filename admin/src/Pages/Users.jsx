import React, { useState } from "react";
import { Plus, Minus, Pencil, Trash2 } from "lucide-react";

const dummyUser = {
  name: "John Roy",
  email: "john@example.com",
  number: 9876543210,
  country: "India",
  state: "Odisha",
  district: "Cuttack",
  city: "Bhubaneswar",
  address: "123 Main Street",
};

// 20 dummy users
const users = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  ...dummyUser,
}));

function Users() {
  const [expandedRows, setExpandedRows] = useState([]);

  const toggleRow = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-4 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-xl font-semibold mb-2 sm:mb-0">Users</h2>
        <button className="px-4 py-2 border border-gray-400 rounded-md text-sm hover:bg-gray-100">
          + Create User
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left w-8"></th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Number</th>
              <th className="p-2 text-left hidden md:table-cell">Country</th>
              <th className="p-2 text-left hidden md:table-cell">State</th>
              <th className="p-2 text-left hidden lg:table-cell">District</th>
              <th className="p-2 text-left hidden lg:table-cell">City</th>
              <th className="p-2 text-left hidden xl:table-cell">Address</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const isExpanded = expandedRows.includes(user.id);
              return (
                <React.Fragment key={user.id}>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-2 align-top">
                      <button
                        onClick={() => toggleRow(user.id)}
                        className="md:hidden"
                      >
                        {isExpanded ? <Minus size={18} /> : <Plus size={18} />}
                      </button>
                    </td>
                    <td className="p-2">{user.name}</td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-2">{user.number}</td>
                    <td className="p-2 hidden md:table-cell">{user.country}</td>
                    <td className="p-2 hidden md:table-cell">{user.state}</td>
                    <td className="p-2 hidden lg:table-cell">
                      {user.district}
                    </td>
                    <td className="p-2 hidden lg:table-cell">{user.city}</td>
                    <td className="p-2 hidden xl:table-cell">{user.address}</td>
                    <td className="p-2 space-x-2">
                      <button className="px-2 py-1 border border-gray-400 rounded text-xs hover:bg-gray-100">
                        <Pencil size={14} className="inline-block mr-1" />
                        Edit
                      </button>
                      <button className="px-2 py-1 border border-gray-400 rounded text-xs hover:bg-gray-100">
                        <Trash2 size={14} className="inline-block mr-1" />
                        Delete
                      </button>
                    </td>
                  </tr>

                  {/* Expanded row for small screens only */}
                  {isExpanded && (
                    <tr className="bg-gray-50 md:hidden">
                      <td colSpan="10" className="p-3">
                        <div className="text-gray-600 text-sm space-y-1">
                          <div>
                            <strong>Country:</strong> {user.country}
                          </div>
                          <div>
                            <strong>State:</strong> {user.state}
                          </div>
                          <div>
                            <strong>District:</strong> {user.district}
                          </div>
                          <div>
                            <strong>City:</strong> {user.city}
                          </div>
                          <div>
                            <strong>Address:</strong> {user.address}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
