import React, { useCallback, useEffect, useState } from "react";
import { Plus, Minus, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import Swal from "sweetalert2";
import TableSkeliton from "../component/TableSkeliton";
function Users() {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [filterData, setfilterData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    district: "",
  });
  const [isfilterActive, setisfilterActive] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    country: "",
    state: "",
    district: "",
    city: "",
    address: "",
  });
  const handlefilterinput = (e) => {
    const { name, value } = e.target;
    setfilterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    console.log(users);
  }, [users]);
  const [expandedRows, setExpandedRows] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [isloading, setisloading] = useState(false);
  const server_url = process.env.REACT_APP_SERVER_URL;

  const fetchUser = useCallback(async () => {
    setisloading(true);
    try {
      const results = await axios.get(`${server_url}admin/all-users`);
      if (results.data?.users) {
        setUsers(results.data.users);
      }
      setisloading(false);
    } catch (err) {
      setisloading(false);
      console.log("Error occurred while fetching user details", err);
    }
  }, [server_url]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${server_url}admin/create-user`, {
        formData,
      });
      if (res.data?.success) {
        toast.success("User created");
        fetchUser();
      }
      setFormData({
        name: "",
        email: "",
        number: "",
        password: "",
        country: "",
        state: "",
        district: "",
        city: "",
        address: "",
      });
      setShowForm(false);
    } catch (error) {
      console.log(
        "Failed to create user: " +
          (error.response?.data?.message || error.message)
      );
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      }
    }
  };

  const deleteUser = async (e, id) => {
    e.preventDefault();

    const swalWithTailwindButtons = Swal.mixin({
      customClass: {
        confirmButton:
          "bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mr-2",
        cancelButton:
          "bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded",
      },
      buttonsStyling: false,
    });

    const result = await swalWithTailwindButtons.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the user.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        const res = await axios.delete(`${server_url}admin/delete-user`, {
          data: { id },
        });

        if (res.data?.success) {
          swalWithTailwindButtons.fire({
            title: "Deleted!",
            text: "User has been deleted.",
            icon: "success",
          });
          fetchUser();
        }
      } catch (err) {
        console.log(err);
        swalWithTailwindButtons.fire({
          title: "Error",
          text: "Failed to delete user. Please try again.",
          icon: "error",
        });
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithTailwindButtons.fire({
        title: "Cancelled",
        text: "User deletion has been cancelled.",
        icon: "error",
      });
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${server_url}admin/update-user`, {
        id: editUserId,
        ...editFormData,
      });
      if (res.data?.success) {
        toast.success("User updated successfully");
        fetchUser();
        setEditUserId(null);
        setShowEditForm(false);
      }
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update user");
    }
  };

  const toggleRow = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleEditClick = (user) => {
    setEditUserId(user._id);
    setEditFormData({ ...user });
    setShowEditForm(true);
  };
  const submitFilter = (e) => {
    e.preventDefault();
    const filteredUsers = users.filter((user) => {
      return (
        (filterData.name === "" ||
          user.name.toLowerCase().includes(filterData.name.toLowerCase())) &&
        (filterData.email === "" ||
          user.email.toLowerCase().includes(filterData.email.toLowerCase())) &&
        (filterData.phone === "" ||
          user.number.toString().includes(filterData.phone)) &&
        (filterData.country === "" ||
          user.country
            .toLowerCase()
            .includes(filterData.country.toLowerCase())) &&
        (filterData.state === "" ||
          user.state.toLowerCase().includes(filterData.state.toLowerCase())) &&
        (filterData.district === "" ||
          user.district
            .toLowerCase()
            .includes(filterData.district.toLowerCase()))
      );
    });
    setUsers(filteredUsers);
    setisfilterActive(false);
  };
  const clearFilter = () => {
    setfilterData((prev) => ({
      ...prev,
      name: "",
      email: "",
      phone: "",
      country: "",
      state: "",
      district: "",
    }));
    fetchUser();
    setisfilterActive(false);
  };
  return (
    <div className="relative p-4 w-full">
      {isloading === true ? (
        <TableSkeliton />
      ) : (
        <div>
          {" "}
          <div className="flex flex-row justify-between items-start sm:items-center mb-4">
            <h2 className="text-xl font-semibold mb-2 sm:mb-0">Users</h2>
            <div>
              <button
                onClick={() => setisfilterActive(!isfilterActive)}
                className="px-4 py-2 border border-gray-400 rounded-md text-sm hover:bg-gray-100"
              >
                Filter
              </button>
              <button
                onClick={() => setShowForm(true)}
                className="px-4 ml-2 py-2 border border-gray-400 rounded-md text-sm hover:bg-gray-100"
              >
                + Create User
              </button>
            </div>
          </div>
          {isfilterActive && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto hide-scrollbar">
                <div className="border-b p-4 flex justify-between items-center sticky top-0 bg-white z-10">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Filter Users
                  </h3>
                  <button
                    onClick={() => setisfilterActive(!isfilterActive)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        value={filterData.name}
                        name="name"
                        placeholder="Search by name..."
                        onChange={handlefilterinput}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 text-sm border"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        onChange={handlefilterinput}
                        type="email"
                        name="email"
                        value={filterData.email}
                        placeholder="Search by email..."
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 text-sm border"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={filterData.phone}
                        onChange={handlefilterinput}
                        placeholder="Search by phone..."
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 text-sm border"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Country
                      </label>
                      <select
                        value={filterData.country}
                        name="country"
                        onChange={handlefilterinput}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 text-sm border"
                      >
                        <option value="">All Countries</option>
                        {[...new Set(users.map((user) => user.country))].map(
                          (country, i) => (
                            <option key={i}>{country}</option>
                          )
                        )}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        State
                      </label>
                      <select
                        name="state"
                        value={filterData.state}
                        onChange={handlefilterinput}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 text-sm border"
                      >
                        <option value="">All States</option>
                        {[...new Set(users.map((user) => user.state))].map(
                          (state, i) => (
                            <option key={i}>{state}</option>
                          )
                        )}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        District
                      </label>
                      <select
                        name="district"
                        value={filterData.district}
                        onChange={handlefilterinput}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 text-sm border"
                      >
                        <option value="">All Districts</option>
                        {[...new Set(users.map((user) => user.district))].map(
                          (district, i) => (
                            <option key={i}>{district}</option>
                          )
                        )}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="border-t p-4 flex justify-end gap-3 sticky bottom-0 bg-white">
                  <button
                    onClick={clearFilter}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-md"
                  >
                    Clear
                  </button>
                  <button
                    onClick={submitFilter}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left w-8"></th>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left hidden sm:block">Email</th>
                  <th className="p-2 text-left">Number</th>
                  <th className="p-2 text-left hidden md:table-cell">
                    Country
                  </th>
                  <th className="p-2 text-left hidden md:table-cell">State</th>
                  <th className="p-2 text-left hidden lg:table-cell">
                    District
                  </th>
                  <th className="p-2 text-left hidden lg:table-cell">City</th>
                  <th className="p-2 text-left hidden xl:table-cell">
                    Address
                  </th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  const isExpanded = expandedRows.includes(user._id);
                  return (
                    <React.Fragment key={user._id}>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="p-2 align-top">
                          <button
                            onClick={() => toggleRow(user._id)}
                            className="md:hidden"
                          >
                            {isExpanded ? (
                              <Minus size={18} />
                            ) : (
                              <Plus size={18} />
                            )}
                          </button>
                        </td>
                        <td className="p-2">{user.name}</td>
                        <td className="p-2 hidden sm:block">{user.email}</td>
                        <td className="p-2">{user.number}</td>
                        <td className="p-2 hidden md:table-cell">
                          {user.country}
                        </td>
                        <td className="p-2 hidden md:table-cell">
                          {user.state}
                        </td>
                        <td className="p-2 hidden lg:table-cell">
                          {user.district}
                        </td>
                        <td className="p-2 hidden lg:table-cell">
                          {user.city}
                        </td>
                        <td className="p-2 hidden xl:table-cell">
                          {user.address}
                        </td>
                        <td className="p-2 space-x-2">
                          <button
                            onClick={() => handleEditClick(user)}
                            className="px-2 py-1 border border-gray-400 rounded text-xs hover:bg-gray-100"
                          >
                            <Pencil size={14} className="inline-block mr-1" />
                            <span className="hidden sm:inline-block">Edit</span>
                          </button>
                          <button
                            onClick={(e) => deleteUser(e, user._id)}
                            className="px-2 py-1 border border-gray-400 rounded text-xs hover:bg-gray-100"
                          >
                            <Trash2 size={14} className="inline-block mr-1" />
                            <span className="hidden sm:inline-block">
                              Delete
                            </span>
                          </button>
                        </td>
                      </tr>
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
      )}

      {showForm && (
        <UserForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          onClose={() => setShowForm(false)}
          title="Create New User"
        />
      )}
      {showEditForm && (
        <UserForm
          formData={editFormData}
          handleInputChange={handleEditChange}
          handleSubmit={handleUpdateUser}
          onClose={() => {
            setShowEditForm(false);
            setEditUserId(null);
          }}
          title="Edit User"
        />
      )}
    </div>
  );
}

function UserForm({
  formData,
  handleInputChange,
  handleSubmit,
  onClose,
  title,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white bg-opacity-90 backdrop-blur-lg shadow-xl rounded-3xl p-6 sm:p-8 space-y-4 overflow-y-auto max-h-[90vh]"
      >
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-blue-700">
          {title}
        </h2>
        <p className="text-center text-sm text-gray-500">Fill in the details</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 *:outline-none *:p-3 *:px-2 *:py-1 *:rounded-sm">
          {[
            "name",
            "email",
            "number",
            "password",
            "country",
            "state",
            "district",
            "city",
          ].map((field) => (
            <input
              key={field}
              type={field === "email" ? "email" : "text"}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              required
              value={formData[field] || ""}
              onChange={handleInputChange}
            />
          ))}
        </div>
        <textarea
          name="address"
          placeholder="Full Address"
          rows="3"
          required
          className="w-full rounded-sm outline-none"
          value={formData.address || ""}
          onChange={handleInputChange}
        />
        <div className="flex justify-between items-center mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold px-6 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-600 hover:text-red-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default Users;
