import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import CloudinaryUpload from "../utils/UploadCloudinary";
import SkelitonLoader from "../component/SkelitonLoader";
import Swal from "sweetalert2";

function Banner() {
  const server_url = process.env.REACT_APP_SERVER_URL;
  const [banners, setBanners] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setloading] = useState(false);
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    description: "",
    image: null,
    filename: "",
    previewUrl: "",
  });

  const fetchbanner = useCallback(async () => {
    setloading(true);
    try {
      const result = await axios.get(`${server_url}public/all-banners`);
      if (result.data?.banners) {
        setBanners(result.data.banners);
      }
      setloading(false);
    } catch (err) {
      console.log(err);
    } finally {
      setloading(false);
    }
  }, [server_url]);

  useEffect(() => {
    fetchbanner();
  }, [fetchbanner]);

  const handleFormSubmit = async () => {
    setloading(true);
    try {
      const { uploadImage } = CloudinaryUpload();

      let imgurl = formData.image;

      if (formData.image && typeof formData.image !== "string") {
        imgurl = await uploadImage(formData.image);
        if (!imgurl) {
          return toast.error("Image upload failed");
        }
      }

      if (isEditing) {
        const result = await axios.put(`${server_url}admin/update-banner`, {
          id: formData._id,
          name: formData.name,
          image: imgurl,
          description: formData.description,
        });

        if (result.data?.message) {
          toast.success(result.data.message);
        }
      } else {
        const result = await axios.post(`${server_url}admin/create-banner`, {
          name: formData.name,
          image: imgurl,
          description: formData.description,
        });

        if (result.data?.message) {
          toast.success(result.data.message);
        }
      }
      setShowForm(false);
      setFormData({
        _id: "",
        name: "",
        description: "",
        image: null,
        filename: "",
        previewUrl: "",
      });
      fetchbanner();
    } catch (err) {
      console.log(err);
      toast.error("Failed to submit form");
    } finally {
      setloading(false);
    }
  };

  const handleDelete = async (id) => {
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
      text: "This banner will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          `${server_url}admin/delete-banner`,
          {
            data: { id },
          }
        );

        if (response.data?.message) {
          swalWithTailwindButtons.fire({
            title: "Deleted!",
            text: response.data.message,
            icon: "success",
          });
          fetchbanner();
        }
      } catch (err) {
        console.error("Delete error:", err);
        swalWithTailwindButtons.fire({
          title: "Error",
          text: "Failed to delete banner. Please try again.",
          icon: "error",
        });
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithTailwindButtons.fire({
        title: "Cancelled",
        text: "The banner is safe.",
        icon: "error",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      if (file) {
        setFormData((prev) => ({
          ...prev,
          filename: file.name,
          image: file,
          previewUrl: URL.createObjectURL(file),
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const openCreateForm = () => {
    setFormData({
      _id: "",
      name: "",
      description: "",
      image: null,
      filename: "",
      previewUrl: "",
    });
    setIsEditing(false);
    setShowForm(true);
  };

  const openEditForm = (banner) => {
    setFormData({
      _id: banner._id,
      name: banner.name,
      description: banner.description,
      image: banner.image,
      previewUrl: banner.image,
      filename: "",
    });
    setIsEditing(true);
    setShowForm(true);
  };

  return (
    <div className=" bg-gray-100 p-6 pb-20 ">
      {loading === true ? (
        <SkelitonLoader />
      ) : (
        <div>
          {" "}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Our Banners</h2>
            <button
              onClick={openCreateForm}
              disabled={loading}
              className="px-3 cursor-pointer py-2 rounded-md border bg-gray-200 text-gray-700"
            >
              {loading ? "Createing..." : "+ Create Banner"}
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {banners.map((banner) => (
              <div
                key={banner._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden"
              >
                <img
                  src={banner.image}
                  alt={banner.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{banner.name}</h3>
                  <p className="text-gray-600 mt-2 text-sm">
                    {banner.description}
                  </p>
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => openEditForm(banner)}
                      className="px-4 py-1 bg-gray-400 rounded text-sm text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(banner._id)}
                      className="px-4 py-1 bg-red-500 rounded text-sm text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showForm && (
        <FormsModel
          formData={formData}
          setShowModal={setShowForm}
          handleInputChange={handleInputChange}
          handleSubmit={handleFormSubmit}
          isEditing={isEditing}
          loading={loading}
        />
      )}
    </div>
  );
}

const FormsModel = ({
  formData,
  setShowModal,
  handleInputChange,
  handleSubmit,
  isEditing,
  loading,
}) => {
  return (
    <>
      <div
        className="inset-0 bg-black fixed bg-opacity-40 z-10"
        onClick={() => setShowModal(false)}
      ></div>

      <div className="fixed top-1/2 border left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-20 p-6 rounded-xl w-full max-w-md shadow-lg">
        <h3 className="text-xl font-bold mb-4">
          {isEditing ? "Edit Banner" : "Create New Banner"}
        </h3>

        <input
          type="text"
          name="name"
          placeholder="Banner Name"
          value={formData.name}
          onChange={handleInputChange}
          className="block w-full mb-3 p-2 border rounded"
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          className="block w-full mb-3 p-2 border rounded"
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleInputChange}
          className="block w-full mb-3 p-2 border rounded"
        />

        {formData.previewUrl && (
          <img
            src={formData.previewUrl}
            alt="Preview"
            className="w-full h-40 object-cover mb-3 rounded"
          />
        )}

        <div className="flex justify-end gap-2">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {loading ? "Saving..." : isEditing ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Banner;
