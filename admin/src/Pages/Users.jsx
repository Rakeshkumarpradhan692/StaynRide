import React, { useCallback, useEffect, useState } from "react";
import { Plus, Minus, Pencil, Trash2, RotateCcw } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import Swal from "sweetalert2";
import TableSkeliton from "../component/TableSkeliton";
import CloudinaryUpload from "../utils/UploadCloudinary"; // adjust path if needed

function Users() {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [tempdata, settempdata] = useState([]);
  const [filterData, setfilterData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    district: "",
  });
  const { uploadImage } = CloudinaryUpload();
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    email: "",
    number: "",
    password: "",
    country: "",
    state: "",
    district: "",
    city: "",
    address: "",
    Gender: "",
  });
  // const handlefilterinput = (e) => {
  //   const { name, value } = e.target;
  //   setfilterData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };
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
        settempdata(results.data.users);
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
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const handleEditInputChange = (e) => {
    const { name, value, files } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let dataToSubmit = { ...formData };

      if (formData.image instanceof File) {
        const imageUrl = await uploadImage(formData.image);
        if (imageUrl) {
          console.log("image url", imageUrl);
          dataToSubmit.image = imageUrl;
        } else {
          toast.error("Image upload failed. Update aborted.");
          return;
        }
      }

      console.log("formdata", dataToSubmit);

      const res = await axios.post(`${server_url}admin/create-user`, {
        formData: dataToSubmit,
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
        image: "",
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
          "bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded ml-2",
        cancelButton:
          "bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mr-3 ",
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
      let updatedData = { ...editFormData };
      if (editFormData.image instanceof File) {
        const imageUrl = await uploadImage(editFormData.image);
        if (imageUrl) {
          updatedData.image = imageUrl;
        } else {
          toast.error("Image upload failed. Update aborted.");
          return;
        }
      }

      const res = await axios.put(`${server_url}admin/update-user`, {
        id: editUserId,
        ...updatedData,
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

  const handlefilterinput = (e) => {
    const { name, value } = e.target;
    const updatedFilterData = {
      ...filterData,
      [name]: value,
    };
    setfilterData(updatedFilterData);

    const filteredUsers = tempdata.filter((user) => {
      const userName = user.name?.toLowerCase() || "";
      const userEmail = user.email?.toLowerCase() || "";
      const userNumber = user.number?.toString() || "";
      const userCountry = user.country?.toLowerCase() || "";
      const userState = user.state?.toLowerCase() || "";
      const userDistrict = user.district?.toLowerCase() || "";

      const searchTerm = (updatedFilterData.searchTerm || "").toLowerCase();
      const countryTerm = (updatedFilterData.country || "").toLowerCase();
      const stateTerm = (updatedFilterData.state || "").toLowerCase();
      const districtTerm = (updatedFilterData.district || "").toLowerCase();
      return (
        (searchTerm === "" ||
          userName.includes(searchTerm) ||
          userEmail.includes(searchTerm) ||
          userNumber.includes(updatedFilterData.searchTerm || "")) &&
        (countryTerm === "" || userCountry.includes(countryTerm)) &&
        (stateTerm === "" || userState.includes(stateTerm)) &&
        (districtTerm === "" || userDistrict.includes(districtTerm))
      );
    });

    setUsers(filteredUsers);
  };

  const clearFilter = () => {
    setfilterData({
      searchTerm: "",
      country: "",
      state: "",
      district: "",
    });
    setUsers(tempdata);
  };
  return (
    <div className=" p-4 w-full">
      {isloading === true ? (
        <TableSkeliton />
      ) : (
        <div>
          {" "}
          <div className="flex flex-row justify-between items-start sm:items-center mb-4">
            <h2 className="text-xl font-semibold mb-2 sm:mb-0">Users</h2>
            <div>
              <button
                onClick={() => setShowForm(true)}
                className="px-4 ml-2 py-2 border border-gray-400 rounded-md text-sm hover:bg-gray-100"
              >
                + Create User
              </button>
            </div>
          </div>
          <div className=" w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className=" my-4 grid  grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              <input
                type="text"
                value={filterData.searchTerm}
                name="searchTerm"
                placeholder="Name/Email/Phone"
                onChange={handlefilterinput}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 text-sm border"
              />
              <select
                value={filterData.country}
                name="country"
                onChange={handlefilterinput}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 text-sm border"
              >
                <option value="">Country</option>
                {[
                  ...new Set(users.map((user) => user.country.toLowerCase())),
                ].map((country, i) => (
                  <option key={i} value={country}>
                    {country}
                  </option>
                ))}
              </select>

              <select
                value={filterData.state}
                name="state"
                onChange={handlefilterinput}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 text-sm border"
              >
                <option value="">State</option>
                {[
                  ...new Set(users.map((user) => user.state.toLowerCase())),
                ].map((state, i) => (
                  <option key={i} value={state}>
                    {state}
                  </option>
                ))}
              </select>

              <select
                value={filterData.district}
                name="district"
                onChange={handlefilterinput}
                className=" rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 text-sm border"
              >
                <option value="">District</option>
                {[
                  ...new Set(users.map((user) => user.district.toLowerCase())),
                ].map((district, i) => (
                  <option key={i} value={district}>
                    {district}
                  </option>
                ))}
              </select>
              <button
                onClick={clearFilter}
                className="flex items-center text-nowrap gap-1 text-blue-600 hover:text-blue-800"
              >
                <RotateCcw className="w-5 h-5" />
                Reset Filters
              </button>
            </div>
          </div>
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
          handleInputChange={handleEditInputChange}
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
            "image",
            "Gender",
          ].map((field) => (
            <div key={field} className="flex flex-col gap-1">
              <input
                type={field === "image" ? "file" : "text"}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                required={!formData.image}
                {...(field !== "image" && { value: formData[field] || "" })}
                onChange={handleInputChange}
              />

              {field === "image" && formData.image && (
                <div className="flex flex-col gap-2">
                  <img
                    src={
                      typeof formData.image === "string"
                        ? formData.image
                        : URL.createObjectURL(formData.image)
                    }
                    alt="Preview"
                    className="h-32 w-32 object-cover rounded shadow"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleInputChange({
                        target: { name: "image", value: "", files: [] },
                      })
                    }
                    className="text-sm text-red-500 underline self-start"
                  >
                    Remove Image
                  </button>
                </div>
              )}
            </div>
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
